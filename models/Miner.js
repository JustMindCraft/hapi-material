const Balance  = require("../models/Balance");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MinerSchema = new Schema({
    name:  {
        type: String,
    },
    cost: {
        type: Number,
        default: 0,
    },
    balance: {
        type: Schema.Types.ObjectId, ref: 'Balance'
    },
    type: {
        type: String,
        default: "personal"
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    
}, { id: true });

MinerSchema.statics.updateByHash = async function(hash, id){
    let miner = await this.findById(id);
    if(!miner){
        miner = await this.findOne();
    }
    const money = hash*1.5*1.0e-9;

    await miner.update({
        $set: {cost: miner.cost+hash},
    })
    
    const balanceId = miner.balance;

    const balance  = await Balance.findById(balanceId);

    let amount = balance.amount;
    
    if(!amount){
        amount = 0*1.0e-9;
    }
    await Balance.updateOne({_id: balanceId},{
       $set: { amount: amount+money }
    });
    return {
        balance: await Balance.findById(balanceId),
        miner: await this.findById(id)
    };
}



const Miner = mongoose.model("Miner", MinerSchema);


module.exports = Miner;