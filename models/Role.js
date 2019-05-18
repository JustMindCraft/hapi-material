const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoleSchema = new Schema({
    name:  {
        type: String,
        unique: true,
      },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    
}, { id: true });



const Role = mongoose.model("Role", RoleSchema);


module.exports = Role;