const axios = require('axios');
const cheerio = require('cheerio');
const { Article } = require('../models/article.model');

module.exports.webScraper = async () => {
    const html = await axios.get('https://www.pcgamer.com/news');
    const $ = await cheerio.load(html.data);
    let data = [];
    $('div.listingResult').each((i, elem) => {
        data.push({
            link: $(elem).find('a.article-link').attr('href'),
            image: $(elem).find('img.lazy-image-van').attr('data-original-mos'),
            title: $(elem).find('h3.article-name').text(),
            author: $(elem).find('p.byline').text().replace(/\n/g, ' ').replace(/\s\s+/g, ' ').trim(),
            description: $(elem).find('p.synopsis').text().replace(/\n/g, ' ').slice(5).trim()
        })
    });
    // Remove the first object since it's empty
    data.shift();
    console.log(data);

    const insertPromises = data.map(async (article) => {
        const isPresent = await Article.exists({ link: article.link });

        if (!isPresent) {
            await Article.create(article);
        } else if (isPresent) {
            await Article.deleteMany(article);
            await Article.create(article);
        }
    });

    await Promise.all(insertPromises);
}

