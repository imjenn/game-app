const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    id: ObjectId,
    title: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    body: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    user: [ {type: mongoose.Schema.ObjectId, ref : 'User'} ],
    forum: [ {type: mongoose.Schema.ObjectId, ref : "Forum"} ]
}, {timestamps: true})

module.exports.Post = mongoose.model("Post", PostSchema);