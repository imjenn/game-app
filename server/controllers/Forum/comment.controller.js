const { Comment } = require('../../models/Forum/comment.model');

module.exports = {

    // Create 
    create: (req, res) => {
        Comment.create(req.body)
            .then(comment => res.json(comment))
            .catch(err => res.status(400).json(err))
    },

    // Read all
    findAll: (req, res) => {
        Comment.find()
            .then(comments => res.json(comments))
            .catch(err => res.json(err))
    },

    // Read one
    findOne: (req, res) => {
        Comment.findById(req.params.id)
            .then(comment => res.json(comment))
            .catch(err => res.json(err))
    },

    // Update
    update: (req, res) => {
        Comment.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true })
            .then(updatedComment => res.json(updatedComment))
            .catch(err => res.status(400).json(err))
    },

    // Delete
    delete: (req, res) => {
        Comment.findByIdAndDelete(req.params.id)
            .then(result => res.json({ result: result }))
            .catch(err => res.json(err))
    }
}