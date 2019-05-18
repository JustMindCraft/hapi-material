const app = require("../../NextApp");
const User = require("../../models/User");
const Session = require("../../models/Session");
function login(router){
    router
    .get('/login', async ctx => {
        try {
            await app.render(ctx.req, ctx.res, '/login', ctx.query);
            ctx.respond = false;
        } catch (error) {
            console.log("渲染错误", error);
            
        }
        
    })
    .get('/logout', async ctx => {
        try {
            const token = ctx.cookies.get("token");
            await Session.remove({token});
            ctx.cookies.set(
                'token', 
                null,
            )
            ctx.query.msg = "SAFETY_LOGOUT";
            await app.render(ctx.req, ctx.res, '/login', ctx.query);
            ctx.respond = false;
        } catch (error) {
            console.log(error);
            
        }
       
    })
    .post('/login', async ctx => {
        const { username, password, token, type } = ctx.request.body;
        const authParams = {
            username,
            password
        }
        const loginRlt = await User.auth(authParams, type);
        console.log(loginRlt.id);
        if(!loginRlt.id){
            ctx.query.msg="USR_OR_PASS_WRONG"
        }else{
            const Session = require("../../models/Session");
            await Session.create({
                token,
                user: loginRlt
            });
            ctx.cookies.set('token', token,);
            return ctx.redirect("/personal?msg=login_success");
        }
        await app.render(ctx.req, ctx.res, '/login', ctx.query);
        ctx.respond = false;
    })
    ;
}

module.exports = login;