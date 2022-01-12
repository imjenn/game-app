const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const db = "game"

// Middleware
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }))

// DB connection link to file 
require('./config/mongoose.config')(db);

// Routes
require('./routes/game.routes')(app)

// Server
app.listen(port, () => console.log(`Listening on port: ${port} :) `))