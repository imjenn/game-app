const Chat = require("../controllers/chat.controller");

module.exports = (app) => {

    // Join Chat Rppm
    app.post('/new', Chat.join)

    // Read
    app.get('/chatRooms/:id', Chat.findRooms)
}