const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const User = require('../models/User');

const db = mongoose.connection;


const register = async (req, res, next) => {

    console.log(req.body);

    const { UserID, UserEmail, UserName } = req.body;
    //if userName  aleady exist, send false.
    let existingUserName
    let existingEmail
    let existingID
    try {
        existingUserName = await User.findOne({ UserName })
        existingEmail = await User.findOne({ UserEmail })
        existingID = await User.findOne({ UserID })
    } catch (err) {

        return res.status(500).json({ data: false, message: 'Somthing went wrong, Please try again later.' });
    };

    if (existingUserName) {
        return res.status(200).json({ data: false, message: 'User Name already exist!' });
    }
    else if (existingEmail) {
        return res.status(200).json({ data: false, message: 'Email already exist!' });
    } else if (existingID) {
        return res.status(200).json({ data: false, message: 'ID already exist!' });
    }

    //else -> enter new user
    else {
        let hashedPassword
        try {
            hashedPassword = await bcrypt.hash(req.body.UserPassword, 12); //bcrypt the password, 12 salting hash. 
        } catch (e) {
            return res.status(500).json({ data: false, message: 'Could not create user, Please try again' });
        }
        const register = new User({
            UserID: req.body.UserID,
            UserFullName: req.body.UserFullName,
            UserEmail: req.body.UserEmail,
            UserName: req.body.UserName,
            UserPassword: hashedPassword,
            UserRole: req.body.UserRole,
            UserBirthDate: req.body.DateOfBirth
        });
        try {
            await register.save();
        } catch (err) {
            return res.status(500).json({ data: false, message: err.message });
        };
        return res.status(200).json({ userDetails: register, data: true, message: 'User was added successfully' });
    };
}

exports.register = register;