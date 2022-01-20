const User = require("../controllers/user.controller");

module.exports = (app) => {

    app.post('/signup', User.register)
    app.post('/login', User.login)
    app.post('/logout', User.logout)
    app.get('/userid', User.getUserCookie)
}