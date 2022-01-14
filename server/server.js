const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = 8000;
const db = "game"

// Middleware
app.use(cookieParser());
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(express.json(), express.urlencoded({ extended: true }))

// DB connection link to file
require('./config/mongoose.config')(db);

// Routes
require('./routes/game.routes')(app);
require('./routes/user.routes')(app);

// Server
app.listen(port, () => console.log(`Listening on port: ${port} :) `))
