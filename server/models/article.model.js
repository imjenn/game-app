const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    link: {
        type: String
    },
    image: {
        type: String
    },
    title: {
        type: String
    },
    author: {
        type: String
    },
    description: {
        type: String
    }
}, {timestamps: true})

module.exports.Article = mongoose.model("Article", ArticleSchema);