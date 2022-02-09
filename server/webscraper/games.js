const axios = require('axios');
const cheerio = require('cheerio');

const webScraper = async () => {
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
    console.log(data);
}

webScraper();