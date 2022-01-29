const express = require('express');
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");
const cors = require('cors');
const http = require("http");
const app = express();
const port = 8000;
const db = "game"

// Middleware
app.use(cookieParser());
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(express.json(), express.urlencoded({ extended: true }))

//sockets
const server = http.createServer(app);
const io = new Server(server, {cors: { origin: "http://localhost:3000", methods: ["GET", "POST"],},});

// DB connection link to file
require('./config/mongoose.config')(db);

// Routes
require('./routes/game.routes')(app);
require('./routes/user.routes')(app);
require('./routes/forum.routes')(app);
require('./routes/post.routes')(app);
require('./routes/chat.routes')(app);
require('./Sockets/socketIO')(io);


server.listen(port, () => {
    console.log(`Listening on port: ${port} :)`);
});

