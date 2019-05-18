const getCurrentUser = require("../utils/getCurrentUser");
const scope = async (ctx, next) => {
    if(ctx.path.indexOf('/_next/')>=0){
      //过滤掉静态链接
      return await next();
    }
    ctx.scope = ["nobody"];
    const user = await getCurrentUser(ctx);
    
    if(user){
        ctx.scope = ["logined"];
        ctx.currentUser = user;
        ctx.res.statusCode = 200;
        ctx.query.currentUser = ctx.currentUser;
       return  await next();
    }else{
        ctx.scope = ["nobody"];
        ctx.currentUser = null;
        ctx.res.statusCode = 200
        return await next();
    }
    await next();
   
}

module.exports = scope;