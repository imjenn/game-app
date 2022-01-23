const { User } = require("../models/user.model");
const { Chat } = require("../models/chat.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

    register: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        let newUser = {
            "username": req.body.username,
            "email": req.body.email,
            "password": hashedPassword
        }
        console.log(req.body);

        // Check if user exists
        User.exists({ email: req.body.email })
            .then(userExists => {
                if (userExists) {
                    return Promise.reject({
                        errors: { 'duplicate': "Email already exists" }
                    })
                }
                // If user does not exist, create new user
                const user = new User(newUser);
                return user.save();
            })
            .then((user) => {
                res.json({ msg: "Success", "user": user })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    },

    login: (req, res) => {
        // Find user by email
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    res.status(400).json({ msg: "User not found" });
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid) {
                                const newJWT = jwt.sign({
                                    _id: user._id
                                }, process.env.SECRET_KEY)
                                res.cookie("usertoken", newJWT, { httpOnly: true }).json(user)
                            } else {
                                res.status(400).json({ msg: "Invalid attempt" })
                            }
                        })
                        .catch(err => res.status(400).json({ msg: "Invalid login" }))
                }
            })
    },

    logout: (req, res) => {
        res.clearCookie("usertoken");
        return res.status(200).json("Logged Out")
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