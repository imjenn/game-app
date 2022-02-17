import { Mongoose } from "mongoose";

const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    id: ObjectId,
    body: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    like: [{ type: mongoose.Schema.ObjectId, ref : "Like" }]
}, {timestamps: true})

module.exports.Comment = mongoose.model("Comment", CommentSchema);