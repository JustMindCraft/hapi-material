const app = require("../../NextApp");
function register(router){
    router
    .get('/register', async ctx => {
        console.log("开始注册");
        
        await app.render(ctx.req, ctx.res, '/register', ctx.query);
        ctx.respond = false;
    })
    .post("/register", async ctx => {
        const User = require("../../models/User");
        const {password, passwordRepeat, email, token} = ctx.request.body;
        let pass = true;
        if(password !== passwordRepeat){
            ctx.res.passwordRepeatValid = true;
            ctx.res.helperText = "二次密码输入不一致";
            pass = false;
        }
        const UserRlt = await User.register(ctx.request.body);
        console.log("注册成功～～～～～", UserRlt.id);
        
        if(UserRlt==="PASSWORD_FORMAT_WRONG"){
            ctx.res.passwordValid = true;
            ctx.res.helperText = "密码格式错误：至少八个字符，至少一个字母和一个数字";
            pass = false;

        }
        if(UserRlt==="EMAIL_ALREADY_EXISTS"){
            ctx.res.emailValid = true;
            ctx.res.helperText = "邮箱已经被注册";
            pass = false;
        }
        if(UserRlt==="EMAIL_ALREADY_EXISTS"){
            ctx.res.emailValid = true;
            ctx.res.helperText = "邮箱已经被注册";
            pass = false;
        }
        if(UserRlt === "EMAIL_FORMAT_WRONG"){
            ctx.res.emailValid = true;
            ctx.res.helperText = "邮箱格式错误";
            pass = false;
        }

        ctx.res.email = email;
        if(pass){
            const Session = require("../../models/Session");
            await Session.create({
                token,
                user: UserRlt
            });
            ctx.cookies.set(
                'token', 
                token,
            )
            return await ctx.redirect("/personal?msg=register_success");
        }
        ctx.respond = false;
        return await app.render(ctx.req, ctx.res, '/register', ctx.query);
        
        
    })
    ;
}

module.exports = register;