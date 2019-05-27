const access = async (ctx, next) => {
  
    if(ctx.path.indexOf('/_next/')>=0){
        //过滤掉静态链接
        return await next();
      }
    //这里定义什么scope能够访问什么path
    if(ctx.path === "/admin")
    {
      if(ctx.scope.includes("nobody")){
        return ctx.redirect("/login?msg=login_first");
      }
    }
    if(ctx.path === "/")
    {
      if(ctx.scope.includes("logined")){
        return ctx.redirect("/personal");
      }
    }
    if(ctx.path.indexOf('/posts/')>=0 && ctx.path.indexOf('preview')>=0 ){
      if(ctx.scope.includes("nobody")){
        return ctx.redirect("/login?msg=login_first");
      }
    }
    if(ctx.path === "/personal")
    {
      if(ctx.scope.includes("nobody")){
       return  ctx.redirect("/login?msg=login_first");
      }
    }
    if(ctx.path === "/posts/autosave")
    {
      if(ctx.scope.includes("nobody")){
       return  ctx.status = 403;
      }
    }
    if(ctx.path === "/posts/new")
    {
      if(ctx.scope.includes("nobody")){
       return  ctx.redirect("/login?msg=login_first");
      }
    }
    if(ctx.path === "/posts")
    {
      if(ctx.scope.includes("nobody")){
       return  ctx.redirect("/login?msg=login_first");
      }
    }
    
    if(ctx.path === "/login")
    {
      if(ctx.scope.includes("logined")){
        return ctx.redirect("/personal?msg=logined_already");
      }
    }
    if(ctx.path === "/register")
    {
      if(ctx.scope.includes("logined")){
       return  ctx.redirect("/personal?msg=logined_already");
      }
    }
    return await next();
  }

module.exports = access;