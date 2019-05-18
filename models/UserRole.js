const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserRoleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    role: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    
}, { id: true });



const UserRole = mongoose.model("UserRole", UserRoleSchema);


module.exports = UserRole;