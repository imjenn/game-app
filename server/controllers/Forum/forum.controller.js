const { Forum } = require('../../models/Forum/forum.model');
const { Game } = require('../../models/game.model');
const { Post } = require('../../models/Forum/post.model');

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
        const promise1 = Forum.findOne({game:  req.params.id})
            .then( forum => {
                if (forum === null) {
                    res.status(400).json({msg: "not found"});
                } else {
                    return forum;
                }
            }) 

        const promise2 = Game.findById(req.params.id) 
            .then(game => {
                // res.json(game)
                return game;
            })
            .catch(err => res.json(err))

        const promise3 = Post.find({game: req.params.id})
            .then(post => {
                // res.json(game)
                return post;
            })
            .catch(err => res.json(err))
                
        Promise.all([promise1, promise2, promise3]).then(values => {
            console.log(values)
            res.json(values)   
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