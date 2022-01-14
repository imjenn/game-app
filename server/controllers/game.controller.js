const {Game} = require('../models/game.model');

// GAMES METHODS
module.exports = {

    // Create
    create: (req, res) => {
        Game.create(req.body)
            .then(game => res.json(game))
            .catch(err => res.status(400).json(err))
    }
}