const app = require("../../NextApp");
const Balance = require("../../models/Balance");
const Miner = require("../../models/Miner");
function personal(router){
    router
    .get('/personal', async ctx => {
        //是否有钱包
        const user = ctx.query.currentUser.user;
        let balance = await Balance.findOne({user: user._id});
        if(!balance){
           balance =  await Balance.create({
                user,
                amount: 0
            })
        }
                
        //是否有矿机
        const minerCount = await Miner.count({balance, type: "personal"});
        console.log(minerCount);
        
        if(minerCount===0){
            await Miner.create({
                balance,
                name: "个人矿机",
                cost: 0,
            })
        }

       ctx.query.minerCount = minerCount;
       ctx.query.balance = balance;
       ctx.query.personalMiner = await Miner.findOne({balance, type: "personal"});
        await app.render(ctx.req, ctx.res, '/personal', ctx.query);
        ctx.respond = false;
    })
    ;
}

module.exports = personal;