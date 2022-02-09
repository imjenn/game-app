const Chat = require("../controllers/chat.controller");

module.exports = (app) => {

    // Join Chat Rppm
    app.post('/new', Chat.join)

    app.post('/joinChat', Chat.joinChat)

    app.post('/joinRoomURL/:id', Chat.joinChatURL)

    // Retrieve one chatroom
    app.get('/chatRooms/:id', Chat.findRooms)

    // Create chat room
    app.post('/newChat', Chat.createChat)

    // Create message
    app.post('/saveMessage', Chat.newMessageList)

    // Retrieve all messages
    app.get('/getMessages', Chat.messageList)
}