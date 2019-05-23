const Post = require("../../models/Post");
const User = require("../../models/User");


function postsApi(router){
    router
    .get('/api/posts', async ctx => {
        const user = ctx.query.currentUser.user;
        let {pagesize, page, status, search} = ctx.query;
       
        if(!pagesize){
            pagesize = 25;
        }
        if(!page){
            page = 1;
        }
        if(!status){
            status = "draft";
        }

        const regex = new RegExp(search, "gi");
       
        const posts = await Post.find({user: user._id, status, title: regex, content: regex}, null, {skip: (parseInt(page)-1)*parseInt(pagesize)}).sort({created: -1}).limit(parseInt(pagesize))
        
        ctx.body = posts;
    })
    .patch('/api/posts/:id/delete', async ctx => {
        const { id } = ctx.params;
        ctx.body = await Post.findByIdAndUpdate(id, {
            $set: {
                status: "deleted",
            }
        })
    })
    .patch('/api/posts/:id/publish', async ctx => {
        const { id } = ctx.params;
        ctx.body = await Post.findByIdAndUpdate(id, {
            $set: {
                status: "published",
            }
        })
    })
    .patch('/api/posts/:id/draft', async ctx => {
        const { id } = ctx.params;
        ctx.body = await Post.findByIdAndUpdate(id, {
            $set: {
                status: "draft",
            }
        })
    })
    .patch('/api/posts/:id', async ctx => {
        const { id } = ctx.params;
        const { status } = ctx.request.body;
        try {
            ctx.body = await Post.findByIdAndUpdate(id, {
                $set: {
                    status,
                }
            })
        } catch (error) {
            console.log(error);
            
        }
       
    })
    .patch('/api/posts', async ctx => {
        const { condition, data } = ctx.request.body;
       
        let isPublic = true;
        if(data.password!=="" && data){
            isPublic = false;
        }
        ctx.body = await Post.updateMany(condition, {
            $set: {
                ...data,
                isPublic
            }
        })
    })
    .del('/api/posts', async ctx=> {
        const { condition } = ctx.query;
        try {
             ctx.body = await Post.deleteMany(JSON.parse(condition));
            
        } catch (error) {
            console.log(error);
            
        }
    })
}

module.exports = postsApi;