
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res, next) => {

    const { UserName, UserPassword, UserRole } = req.body;
    let user
    try {
        user = await User.findOne({ UserName });
    } catch (err) {
        return res.status(500).json({ data: false, message: 'Something went wrong, Please try again later' });
    }

    if (!user) {
        return res.status(200).json({ data: false, message: 'Invalid UserName' });
    }
    //decrypt hashed password
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(UserPassword, user.UserPassword);
    } catch (e) {
        return res.status(500).json({ data: false, message: 'Could not log you in, Please try again.' });
    }

    if (!isValidPassword) {
        return res.status(200).json({ data: false, message: 'Invalid Password' });
    }

    //generates token
    let token;
    try {
        token = jwt.sign(
            { userName: user.UserName , userRole: user.UserRole },
            'SecretPassword',
            { expiresIn: '1h' }
        );
    } catch (e) {
        console.log(e);
        return res.status(500).json({ data: false, message: 'Somthing went wrong, Please try again later.' });
    }
    console.log(UserRole);
    return res.status(200).json({ userName: user.UserName, userRole: [user.UserRole], token: token, data: true, message: 'User login successfully' });



};

exports.login = login;   