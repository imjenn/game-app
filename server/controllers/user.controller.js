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

    logout: (req, res) => {
        res.clearCookie("usertoken");
        return res.status(200).json("Logged Out")
    }
}