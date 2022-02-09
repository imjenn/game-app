const Article = require("../controllers/article.controller");

module.exports = (app) => {

    // Create
    app.post('/article/new', Article.create);
    // Read all
    app.get('/articles', Article.findAll);
    // Read one
    app.get('/article/:id', Article.findOne);
    // Update
    app.put('/article/update/:id', Article.update);
    // Delete
    app.delete('/article/delete/:id', Article.delete);
}