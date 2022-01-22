const User = require("../controllers/user.controller");

module.exports = (app) => {

    // Register
    app.post('/signup', User.register)
    // Login
    app.post('/login', User.login)
    // Logout
    app.post('/logout', User.logout)

    // This should go in chat.routes.js
    app.post('/newChat', User.createChat)
    app.post('/saveMessage', User.newMessageList)
    app.get('/getMessages', User.messageList)
}