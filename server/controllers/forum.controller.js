const { Forum } = require('../models/forum.model');

module.exports = {

    // Create
    create: (req, res) => {
        Forum.create(req.body) 
            .then(forum => res.json(forum))
            .catch(err => res.status(400).json(err))
    },

    // Read all
    findAll: (req, res) => {
        Forum.find()
            .then(forums => res.json(forums))
            .catch(err => res.json(err))
    },

    // Read one 
    findOne: (req, res) => {
        console.log(req.params.id)
        Forum.findOne({game:  req.params.id})
            .then( forum => {
                if (forum === null) {
                    res.status(400).json({msg: "not found"});
                } else {
                    //console.log(user.messageHistory)
                    res.json(forum);
                }
            })
    },

    // Update
    update: (req, res) => {
        Forum.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(updatedForum => res.json(updatedForum))
            .catch(err => res.status(400).json(err))
    },

    // Delete
    delete: (req, res) => {
        Forum.findByIdAndDelete(req.params.id)
            .then(result => res.json({ result: result }))
            .catch(err => console.log(err))
    }
}