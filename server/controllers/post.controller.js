const { Post } = require('../models/post.model');

module.exports = {

    // Create post
    create: (req, res) => {
        Post.create(req.body)
            .then(post => res.json(post))
            .catch(err => res.status(400).json(err))
    },
    
    // Read all
    findAll: (req, res) => {
        Post.find()
            .then(posts => res.json(posts))
            .catch(err => res.json(err))
    },

    // Read one
    findOne: (req, res) => {
        Post.findById(req.params.id)
            .then(post => res.json(post))
            .catch(err => res.json(err))
    },

    // Update
    update: (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(updatedPost => res.json(updatedPost))
            .catch(err => res.status(400).json(err))
    },

    // Delete
    delete: (req, res) => {
        Post.findByIdAndDelete(req.params.id)
            .then(result => res.json({ result: result }))
            .catch(err => console.log(err))
    }
}