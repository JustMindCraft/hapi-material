const app = require("../../NextApp");
const Post = require("../../models/Post");
const User = require("../../models/User");
function posts(router){
    router
    .get('/posts', async ctx => {
        await app.render(ctx.req, ctx.res, '/posts', ctx.query);
        ctx.respond = false;
    })
    .get('/posts/new', async ctx => {
        const user = ctx.query.currentUser.user;
        console.log({user});
        
        await app.render(ctx.req, ctx.res, '/posts/new', ctx.query);
        ctx.respond = false;
    })
    .post('/posts', async ctx => {
        const user = await User.findById(ctx.query.currentUser.user._id);
        const { content, cover, breif, speed, title, password } = ctx.request.body;
        const post = await Post.create({
            content, cover, breif, speed, title, password, user, isPublic: password===""
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