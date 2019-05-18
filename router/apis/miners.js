function miners(router){
    router
    .get('/api/v1/miners/:id/update_hash', async ctx => {
        console.log(ctx.params);
        
        ctx.body = "123123"
       
    })
    ;
}

module.exports = miners;