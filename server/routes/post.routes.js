const Post = require("../controllers/post.controller");

module.exports = (app) => {

    // Create
    app.post('/post/new', Post.create);
    // Read all
    app.get('/posts', Post.findAll);
    // Read one
    app.get('/post/:id', Post.findOne);
    // Update
    app.put('/update/:id', Post.update);
    // Delete
    app.delete('/delete/:id', Post.delete);
    
}