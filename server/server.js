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
require('./routes/forum.routes')(app);
require('./routes/post.routes')(app);
require('./routes/chat.routes')(app);
require('./Sockets/socketIO')(io);
require('./webscraper/games');

// const webScraper = async () => {
//     const html = await axios.get('https://www.pcgamer.com/news');
//     const $ = await cheerio.load(html.data);
//     let data = [];
//     $('div.listingResult').each((i, elem) => {
//         data.push({
//             link: $(elem).find('a.article-link').attr('href'),
//             image: $(elem).find('img.lazy-image-van').attr('data-original-mos'),
//             title: $(elem).find('h3.article-name').text(),
//             author: $(elem).find('p.byline').text().replace(/\n/g, ' ').replace(/\s\s+/g, ' ').trim(),
            
//         })
//     });
//     console.log(data);
// }

// webScraper();

server.listen(port, () => {
    console.log(`Listening on port: ${port} :)`);
});

