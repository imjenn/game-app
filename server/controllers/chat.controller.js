const { Chat } = require('../models/chat.model');
const {User} = require("../models/user.model");

// GAMES METHODS
module.exports = {

    // Create room
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

    },

    createChat: async (req, res) => {
        console.log(req.body)


        Chat.exists({ id: req.body.id, roomName: req.body.roomName })
            .then(chatExists => {
                if (chatExists) {
                    return Promise.reject({
                        errors: { 'duplicate': "Chat already exists" }
                    })
                }
                // If user does not exist, create new user
                const chatRoom = new Chat(req.body);
                return chatRoom.save();
            })
            .then((chat) => {
                res.json({ msg: "Success", "chat": chat })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },

    newMessageList: async (req, res) => {
        console.log(req.body)

        Chat.findOneAndUpdate(
            {
                _id: "61eaf59079904068e8a661dd",
            }, {$push: {
                    messageHistory: [{
                        username: req.body.author,
                        msg: req.body.message,
                        timestamp: req.body.time
                    }]
                }}, function (err, res){
                //console.log(err);
            }
        )
    },

    messageList: async (req, res) => {
        console.log(req.body)

        Chat.findOne({_id:  '61eaf59079904068e8a661dd' })
            .then( user => {
                if (user === null) {
                    res.status(400).json({msg: "User not found"});
                } else {
                    //console.log(user.messageHistory)
                    res.send(user);
                }
            })
    }
}