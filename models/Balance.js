const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BalanceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    amount: {
        type: Number,
        default: 0,
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    
}, { id: true });



const Balance = mongoose.model("Balance", BalanceSchema);


module.exports = Balance;