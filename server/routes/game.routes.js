const Game = require("../controllers/game.controller");

module.exports = (app) => {
    
    // Create
    app.post('/new', Game.create)
    // Read all
    app.get('/games', Game.findAll)
    // Read one
    app.get('/games/:id', Game.findOne)
}