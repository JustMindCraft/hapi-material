const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    miner: {
        type: Schema.Types.ObjectId, ref: 'Miner'
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    title: String,
    content: String,
    status: {
        type: String, default: "draft"
    },
    tags: {
        type: Array,
        default: [],
    },
    breif: String,
    cover: String,
    isPublic: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        default: "",
    },
    speed: {
        type: Number,
        default: 0.1
    },
    preStatus: {
        type: String,
        default: "draft"
    },
    read: {
        type: Number,
        default: 0
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
}, { id: true });



const Post = mongoose.model("Post", PostSchema);


module.exports = Post;