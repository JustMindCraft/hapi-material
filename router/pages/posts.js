const app = require("../../NextApp");
const Post = require("../../models/Post");
const User = require("../../models/User");
const crypto = require('crypto');

function posts(router){
    router
    .get('/posts', async ctx => {
        const user = ctx.query.currentUser.user;
        const posts = await Post.find({user}).sort({created: -1}).limit(25)
        ctx.query.posts = posts;
        await app.render(ctx.req, ctx.res, '/posts', ctx.query);
        ctx.respond = false;
    })
    .get('/posts/new', async ctx => {
        const user = ctx.query.currentUser.user;
        console.log({user});
        
        await app.render(ctx.req, ctx.res, '/posts/new', ctx.query);
        ctx.respond = false;
    })
    .get('/posts/:id', async ctx => {
        
        const { id } = ctx.params;
        const post = await Post.findById(id);
        const md5 = crypto.createHash('md5');
        if(post.isPublic || ctx.cookies.get(`${id}_password`)===md5.update(post.password).digest('hex')){
            ctx.query.post = post 
            await app.render(ctx.req, ctx.res, '/posts/show', ctx.query);
            ctx.respond = false;
        }else{
            ctx.redirect(`/posts/${id}/access`);
        }
    })
    .get('/posts/:id/preview', async ctx => {
        const { id } = ctx.params;
        const post = await Post.findById(id);
        const md5 = crypto.createHash('md5');
        if(post.isPublic || ctx.cookies.get(`${id}_password`)===md5.update(post.password).digest('hex')){
            ctx.query.post = post 
            await app.render(ctx.req, ctx.res, '/posts/preview', ctx.query);
            ctx.respond = false;
        }else{
            ctx.redirect(`/posts/${id}/access?access=preview`);
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
    .post('/posts', async ctx => {
        const user = await User.findById(ctx.query.currentUser.user._id);
        const { content, cover, breif, speed, title, password } = ctx.request.body;
        const post = await Post.create({
            content, cover, breif, speed, title: title!==""? title: "未命名标题", password, user, isPublic: password===""
        })
        ctx.body = post;
        
    })
    .patch("/posts/:id", async ctx => {
        const post = await Post.findById(ctx.params.id);
        const { content, cover, breif, speed, title, password } = ctx.request.body;
        await post.update({
            content, cover, breif, speed, title, password, isPublic: password===""
        })
        ctx.body = post;
    })
}

module.exports = posts;