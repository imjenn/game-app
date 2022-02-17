const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    id: ObjectId,
    number: {
        type: Number
    }
}, {timestamps: true})

module.exports.Like = mongoose.model("Like", LikeSchema);