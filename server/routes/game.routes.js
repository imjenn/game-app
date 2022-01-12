const Game = require("../controllers/game.controller")

module.exports = (app) => {
    ///////////// Routes for games ///////////////

    ///////////// Routes for users ///////////////
    
    // Create
    app.post('/new', Game.create)
}