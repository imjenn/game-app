const { User } = require("../models/user.model");
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
                                res.cookie("usertoken", newJWT, { httpOnly: true }).json("Success")
                            } else {
                                res.status(400).json({ msg: "Invalid attempt" })
                            }
                        })
                        .catch(err => res.status(400).json({ msg: "Invalid login" }))
                }
            })
    },

    allUsers: (req, res) => {
        User.find()
            .then(allUsers => res.json(allUsers))
            .catch(err => res.json(err))
    },

    logout: (req, res) => {
        res.clearCookie("usertoken");
        return res.status(200).json("Logged Out")
    }
}



// const {User} = require('../models/user.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const mongoose = require("mongoose");
//
// // GAMES METHODS
// module.exports = {
//
//     // Create
//     signUp: async (req, res) => {
//         const { username, email, password, games } = req.body;
//         const secret = 'gameAppTester'; // should be in the .env file
//
//         try {
//             const existingUser = await User.findOne({ email });
//
//             if (existingUser){
//                 return res.status(400).json({ message: "User already exists" });
//             }
//
//             const hashedPassword = await bcrypt.hash(password, 12);
//             const result = await User.create({ username, email, password: hashedPassword, games});
//             const token = jwt.sign( { username: result.username, id: result._id }, secret, { expiresIn: "24h" } );
//
//             res.status(201).json({ result, token });
//         } catch (error) {
//             res.status(500).json({ message: "Something went wrong" });
//
//             console.log(error);
//         }
//
//     },
//
//     login: async (req, res) => {
//         const { password, username } = req.body;
//         const secret = 'gameAppTester'; // should be in the .env file
//
//         //console.log(password, username);
//
//         try {
//             const existingUser = await User.findOne({ email });
//
//             console.log("This is the result", existingUser)
//
//             if (!existingUser) {
//                 return res.status(404).json({message: "User doesn't exist"});
//             }
//
//             const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//
//             if (!isPasswordCorrect) {
//                 return res.status(400).json({message: "Invalid credentials"});
//             }
//
//             const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "24h" });
//
//             res.status(200).json({ result: existingUser, token });
//         } catch (err) {
//             res.status(500).json({ message: "Something went wrong" });
//         }
//     }
// }