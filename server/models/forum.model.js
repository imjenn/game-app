const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
    id: ObjectId,
    forumName: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    game: { type: mongoose.Schema.ObjectId, ref : "Game"},
    post: [ { type: mongoose.Schema.ObjectId, ref : "Post"} ]
}, {timestamps: true})

module.exports.Forum = mongoose.model("Forum", ForumSchema);