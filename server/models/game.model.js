const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: ObjectId,
    username: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [3, "{PATH} must be at least 3 characters"]
    },
    email: {
        type: String, 
        required: [true, "{PATH} is required"]
    },
    password: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [8, "{PATH} must be at least 8 characters"]
    },
    games: [ {type: mongoose.Schema.ObjectId, ref : 'Game'} ]
}, {timestamps: true});

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

module.exports.User = mongoose.model('User', UserSchema);
module.exports.Game = mongoose.model("Game", GameSchema)