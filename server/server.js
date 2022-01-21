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

const server = http.createServer(app);

// DB connection link to file
require('./config/mongoose.config')(db);

// Routes
require('./routes/game.routes')(app);
require('./routes/user.routes')(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    // console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        // console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        // console.log(data);
    });

    socket.on("disconnect", () => {
        // console.log("User Disconnected", socket.id);
    });
});

server.listen(port, () => {
    console.log(`Listening on port: ${port} :)`);
});


// Server
//app.listen(port, () => console.log(`Listening on port: ${port} :) `))
