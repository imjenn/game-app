const Chat = require("../controllers/chat.controller");

module.exports = (app) => {

    // Join chatroom
    app.post('/new', Chat.join)

    // Retrieve one chatroom
    app.get('/chatRooms/:id', Chat.findRooms)

    // Create chat room
    app.post('/newChat', Chat.createChat)

    // Create message
    app.post('/saveMessage', Chat.newMessageList)

    // Retrieve all messages
    app.get('/getMessages', Chat.messageList)
}