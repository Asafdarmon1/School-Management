const mongoose = require('mongoose');
const uniqueValdiator = require('mongoose-unique-validator');
var validator = require("validator");

const userSchema = new mongoose.Schema({
    UserID: {type: String, required: true},
    UserFullName: { type: String, required: true },
    UserEmail:
    {
        type: String,
        required: true
    },
    UserName: { type: String, required: true },
    UserPassword: { type: String, required: true },
    UserRole: {type: String , required: true},
    UserBirthDate: {type: String, required: true}
},
    {
        versionKey: false //disable __v field in mongoDB
    });

userSchema.plugin(uniqueValdiator); //make sure that email is unique

module.exports = mongoose.model('users', userSchema);