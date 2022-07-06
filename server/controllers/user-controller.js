const User = require('../models/User');
const bcrypt = require('bcryptjs');


//find all users
const getAllUsers = async (req, res, next) => {

    let users
    
    try {
        users = await User.find({})

    } catch (e) {
        return res.status(500).json({ data: false, message: 'Something went wrong, Please try again later' });
    }

    if (users.length == 0) {
        return res.status(200).json({ data: false, message: 'No users to display.' });
    } else {
        return res.status(200).json({ data: users });
    }
}

//filter by full name
const getUserByName = async (req, res, next) => {
    const { UserFullName } = req.body;

    let user
    try {
        user = await User.find({ UserFullName })
    } catch (e) {
        return res.status(500).json({ data: false, message: 'Something went wrong, Please try again later' });
    }
    if (user.length != 0)
        return res.json(user)
    else
        return res.status(200).json({ data: false, message: 'No users found.' });
};


//filter by id
const getUserByID = async (req, res, next) => {

    const { UserID } = req.body;

    let user
    try {
        user = await User.find({ UserID })
    } catch (e) {
        return res.status(500).json({ data: false, message: 'Something went wrong, Please try again later' });
    }
    if (user.length != 0)
        return res.json(user)
    else
        return res.status(200).json({ data: false, message: 'No users found.' });
};

//make user inactive - update
const deleteUser = async (req, res, next) => {

    const { UserName } = req.body;
    let result
    try {
        result = await User.updateOne({ UserName }, { $set: { UserStatus: "inActive" } });
    } catch (err) {
        return res.status(500).json({ data: false, status: 500, message: 'Something went wrong, Please try again later' });
    }
    if (result.matchedCount == 0)
        return res.status(200).json({ data: false, message: 'No users found.' });
    else
        return res.status(200).json({ data: true, message: 'User deleted successfully.' });

};

const restoreUser = async (req, res, next) => {
    const { UserName } = req.body;
    let result;
    try {
        result = await User.updateOne({ UserName }, { $set: { UserStatus: "Active" } })
    } catch (err) {
        return res.status(500).json({ data: false, message: "Something went wrong, Please try again later" });
    }
    return res.status(200).json({ data: true, message: "User restored" })
}

//update user password
const updatePassword = async (req, res, next) => {
    const { UserPassword, UserID } = req.body;
    let hashedPassword;
    let result;

    try {
        hashedPassword = await bcrypt.hash(UserPassword, 12); //bcrypt the password, 12 salting hash.
        result = await User.updateOne({ UserID }, { $set: { UserPassword: hashedPassword } })

    } catch (err) {
        console.log(err);
        return res.send({ data: false, message: err });
    }
    return res.status(200).json({ data: true, message: "Password changed" });
};

//update user details
const updateDetails = async (req, res, next) => {
    const { UserDetails, UserID } = req.body;
    let result;
    try {
        result = await User.updateOne({ UserID }, {
            $set: {
                UserFullName: UserDetails.UserFullName,
                UserPhone: UserDetails.UserPhone,
                DateOfBirth: UserDetails.DateOfBirth,
                UserLanguage: UserDetails.UserLanguage,
                UserType: UserDetails.UserType,
                BusinessName: UserDetails.BusinessName
            }
        });
    } catch (err) {
        return res.status(200).json({ data: false, message: err });
    }
    return res.status(200).json({ data: true, message: "Details up to date" });
}

//update user address
const updateAddress = async (req, res, next) => {
    const { UserAddress, UserID } = req.body;
    let result;
    try {
        result = await User.updateOne({ UserID }, {
            $set: {
                CountryName: UserAddress.CountryName,
                CityName: UserAddress.CityName,
                HouseNumber: UserAddress.HouseNumber
            }
        })
    } catch (err) {
        return res.status(200).json({ data: false, message: err });
    }
    return res.status(200).json({ data: true, message: "Address up to date" })
}



exports.getAllUsers = getAllUsers;
exports.getUserByName = getUserByName;
exports.getUserByID = getUserByID;
exports.deleteUser = deleteUser;
exports.updatePassword = updatePassword;
exports.updateDetails = updateDetails;
exports.updateAddress = updateAddress;
exports.restoreUser = restoreUser;