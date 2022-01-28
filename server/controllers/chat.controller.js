const { Chat } = require('../models/chat.model');
const {User} = require("../models/user.model");

// GAMES METHODS
module.exports = {

    // Create
    join: (req, res) => {
        Chat.create(req.body)
            .then(game => res.json(game))
            .catch(err => res.status(400).json(err))
    },

    // Retrieve one
    findRooms: async (req, res) => {
        let userinfo;
        console.log(req.params)

         await User.findOne({_id: req.params.id})
            .then(  user => {
                if (user === null) {
                    res.status(400).json({msg: "not found"});
                } else {
                    //userinfo = user.chat[0].toJSON();
                    userinfo = user.chat;
                }
            })

        await Chat.find().where('_id').in(userinfo)
            .then(resp => res.json(resp))
            .catch(err => res.status(400).json({msg: "not found", err}))

    }
}