const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    id: ObjectId,
    title: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    studio: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    genre: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    description: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    followers: [ {type: mongoose.Schema.ObjectId, ref : 'User'} ]
}, {timestamps: true})

module.exports.Game = mongoose.model("Game", GameSchema);