const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [3, "Username must be 3 characters or longer"]
    },
    email: {
        type: String,
        required: [true, "{PATH} is required"],
        // VALIDATION - REGEX
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }

}, {timestamps: true});

// CREATE A TEMPORARY CONFIRM PASSWORD ATTRIBUTE IN OUR SCHEMA
// UserSchema.virtual('confirmPassword')
//     .get( () => this._confirmPassword )
//     .set( value => this._confirmPassword = value );
//
// // CREATE VALIDATIONS FOR THE CONFIRM PASSWORD
// UserSchema.pre("validate", function(next){
//     console.log("this is the password ", password)
//     console.log("this is the confirm password ", _confirmPassword)
//
//     if(this.password !== this._confirmPassword){
//         this.invalidate("confirmPassword", "Password and confirm password must match")
//     }
//     next()
// })
//
// // BEFORE SAVING THE USER, SWAP OUT PASSWORD WITH HAShED PASSWORD
// UserSchema.pre("save", function(next) {
//     bcrypt.hash(this.password, 10)
//         .then(hashedPassword => {
//             this.password = hashedPassword
//             next()
//         })
// })
module.exports.User = mongoose.model('User', UserSchema);