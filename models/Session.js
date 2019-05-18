const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SessionSchema = new Schema({
    token:  {
        type: String,
        unique: true,
      },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    key: String,
    value: String,
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
}, { id: true });



const Session = mongoose.model("Session", SessionSchema);


module.exports = Session;