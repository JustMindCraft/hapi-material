function likeu(router){
   
    router
    .get('/likeu', async ctx => {
        let title = 'hello koa2'
        await ctx.render('ueditor', {
            title,
        })
    })
    ;
}

module.exports = likeu;