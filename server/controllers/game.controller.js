const {Game} = require('../models/game.model');

// GAMES METHODS
module.exports = {

    // Create
    create: (req, res) => {
        Game.create(req.body)
            .then(game => res.json(game))
            .catch(err => res.status(400).json(err))
    },

    // Read all
    findAll: (req, res) => {
        Game.find(function (error, result){
            if (error){
                console.log(error);
            }else{
                res.send(result)
            }
        })
    },

    // Retrieve one
    findOne: (req, res) => {
        Game.findById(req.params.id) 
            .then(game => res.json(game))
            .catch(err => res.json(err))
    }
}