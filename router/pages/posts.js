const app = require("../../NextApp");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Miner = require("../../models/Miner");
const crypto = require('crypto');


function posts(router){
    router
    .get('/posts', async ctx => {
        const user = ctx.query.currentUser.user;
        let {pagesize, page} = ctx.query;
        if(!pagesize){
            pagesize = 25;
        }
        if(!page){
            page = 1;
        }
        const posts = await Post.find({user}, {skip: (page-1)*pagesize}).sort({created: -1}).limit(pagesize)
        ctx.query.posts = posts;
        ctx.query.page = page;
        ctx.query.pagesize = pagesize;
        await app.render(ctx.req, ctx.res, '/posts', ctx.query);
        ctx.respond = false;
    })
    .get('/new/posts', async ctx => {
        let {pagesize, page} = ctx.query;
        if(!pagesize){
            pagesize = 8;
        }
        if(!page){
            page = 1;
        }
        if(parseInt(page)<=0){
            page = 1;
        }
        const posts = await Post.find({status: "published"},null,{skip: (parseInt(page)-1)* parseInt(pagesize)}).sort({created: -1}).limit(parseInt(pagesize))
        ctx.query.posts = posts;
        ctx.query.page = page;
        ctx.query.pagesize = pagesize;
        await app.render(ctx.req, ctx.res, '/new_posts', ctx.query);
        ctx.respond = false;
    })
    .get('/posts/new', async ctx => {
        const user = ctx.query.currentUser.user;
        console.log({user});
        
        await app.render(ctx.req, ctx.res, '/posts/new', ctx.query);
        ctx.respond = false;
    })
    .get('/posts/count', async ctx => {
        const user = ctx.query.currentUser.user;
        let { status} = ctx.query;
       
        if(!status){
            status = "draft";
        }
        const count = await Post.count({user: user._id, status});
        ctx.query.count = count;
        ctx.body = count;
    })
    .get('/posts/:id', async ctx => {
        
        const { id } = ctx.params;
        const post = await Post.findById(id);
        const currentUser = ctx.query.currentUser;
        if(!currentUser){
            ctx.redirect("/posts");
        }
        const miner = await Miner.createPostMiner(post);
    
        const md5 = crypto.createHash('md5');
        if(post.isPublic || ctx.cookies.get(`${id}_password`)===md5.update(post.password).digest('hex')){
            const user = await User.findById(post.user);
            ctx.query.post = post 
            ctx.query.author = user;
            ctx.query.miner = miner;
            await post.update({read: post.read? post.read+1: 1});
            await app.render(ctx.req, ctx.res, '/posts/show', ctx.query);
            ctx.respond = false;
        }else{
            ctx.redirect(`/posts/${id}/access`);
        }
    })
    .get('/posts/:id/access', async ctx => {
        const { id } = ctx.params;
        const post = await Post.findById(id);
        ctx.query.title = post.title;
        ctx.query.id = post._id;
        ctx.query.msg = "",
        await app.render(ctx.req, ctx.res, '/posts/access', ctx.query);
        ctx.respond = false;
    })
    .get('/posts/:id/edit', async ctx => {
        const { id } = ctx.params;
        const post = await Post.findById(id);
        ctx.query.post = post
        await app.render(ctx.req, ctx.res, '/posts/edit', ctx.query);
        ctx.respond = false;
    })
    .post('/posts/:id/access', async ctx => {
        const { id } = ctx.params;
        const { password, access } = ctx.request.body;
        const post = await Post.findById(id);
        const md5 = crypto.createHash('md5');
        if(post.password === password){
            ctx.cookies.set(`${id}_password`, md5.update(post.password).digest('hex'));
            if(access === "preview"){
                ctx.redirect(`/posts/${id}/preview`);
            }else{
                ctx.redirect(`/posts/${id}`)
            }
        }else{
            ctx.query.msg = "password_wrong"
            ctx.query.title = post.title;
            ctx.query.id = post._id;
            ctx.query.access = access;
            await app.render(ctx.req, ctx.res, '/posts/access', ctx.query);
            ctx.respond = false;
        }
       
    })
    .patch('/posts/:id/publish', async ctx => {
        const post = await Post.findById(ctx.params.id);
        await post.update({
            status: "published"
        })
        ctx.body = post;
       
    })
    .post('/posts', async ctx => {
        const user = await User.findById(ctx.query.currentUser.user._id);
        const { content, cover, breif, speed, title, password } = ctx.request.body;
        let isPublic = false;
        if(password==="" || !password){
            isPublic = true;
        }
        const post = await Post.create({
            content, cover, breif, speed, title: title!==""? title: "未命名标题", password, user, isPublic
        })
        ctx.body = post;
        
    })
    .patch("/posts/:id", async ctx => {
        const post = await Post.findById(ctx.params.id);
        const { content, cover, breif, speed, title, password } = ctx.request.body;
        let isPublic = false;
        if(password==="" || !password){
            isPublic = true;
        }
        await post.update({
            $set: {
                content, cover, breif, speed, title: title!==""? title: "未命名标题", password, isPublic,
            }
        })
        ctx.body = post;
    })
}

module.exports = posts;