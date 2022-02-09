const { Article } = require('../modles/article.model');

module.exports = {

    // Create 
    create: (req, res) => {
        Article.create(req.body)
            .then(article => res.json(article))
            .catch(err => res.status(400).json(err))
    },

    // Read all
    findAll: (req, res) => {
        Article.find()
            .then(articles => res.json(articles))
            .catch(err => res.json(err))
    },

    // Read one
    findOne: (req, res) => {
        Article.findById(req.params.id)
            .then(article => res.json(article))
            .catch(err => res.json(err))
    },

    // Update
    update: (req, res) => {
        Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(updatedArticle => res.json(updatedArticle))
            .catch(err => res.status(400).json(err))
    },

    // Delete 
    delete: (req, res) => {
        Article.findByIdAndDelete(req.params.id) 
            .then(result => res.json({ result: result }))
            .catch(err => res.json(err))
    }
}