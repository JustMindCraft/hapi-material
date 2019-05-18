const app = require("../../NextApp");
function admin(router){
    router
    .get('/admin', async ctx => {
        await app.render(ctx.req, ctx.res, '/admin/dashboard', ctx.query);
        ctx.respond = false;
    })
    .get('/admin/dashboard', async ctx => {
        await app.render(ctx.req, ctx.res, '/admin/dashboard', ctx.query);
        ctx.respond = false;
    })
    .post("/personal", async ctx => {
        console.log(ctx.request.body);
        await app.render(ctx.req, ctx.res, '/personal', ctx.query);
        ctx.respond = false;
    })
    ;
}

module.exports = admin;