const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    id: ObjectId,
    owner: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    roomName: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    messageHistory: [
        {
            username: {type: String, required: true},
            msg: {type: String, required: true},
            timestamp: {type: String, required: true}
        }],
    followers: [ {type: mongoose.Schema.ObjectId, ref : 'User'} ]
}, {timestamps: true})

module.exports.Chat = mongoose.model("Chat", ChatSchema);