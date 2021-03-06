const axios = require('axios');
const cheerio = require('cheerio');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const http = require("http");
const { Server } = require("socket.io");


const app = express();
const port = 8000;
const db = "game"

// Middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json(), express.urlencoded({ extended: true }))

// Sockets
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000", methods: ["GET", "POST"], }, });

// DB connection link to file
require('./config/mongoose.config')(db);

// Routes
require('./routes/game.routes')(app);
require('./routes/user.routes')(app);
require('./routes/Forum/forum.routes')(app);
require('./routes/Forum/post.routes')(app);
require('./routes/chat.routes')(app);
require('./routes/article.routes')(app);
require('./Sockets/socketIO')(io);
require('./webscraper/articles');
require('./webscraper/nodecron');

server.listen(port, () => {
    console.log(`Listening on port: ${port} :)`);
});

