const config = require("../config");
const User = require("../models/User");
const Balance = require("../models/Balance");
const Miner = require("../models/Miner");
async function  seed(){
    const superCount = await User.count({email: config.superAdmin.email});
    let user = null;
    
    if(superCount === 0) {  
        user = await User.register(config.superAdmin);
    }else{
        user = await User.findOne({email: config.superAdmin.email});
    }
   
    
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
}

module.exports = seed;