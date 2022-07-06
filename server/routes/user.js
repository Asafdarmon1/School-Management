const express = require('express');

const userControllers = require('../controllers/user-controller');
const router = express.Router(); //import routes



//register routes
//here we get and post user filtering and searching
router.get('/',userControllers.getAllUsers); //getting all the users from mongoDB

router.post('/filterByName',userControllers.getUserByName); //filter by name

router.post('/filterByID',userControllers.getUserByID); //filter by ID

router.post('/deleteUser',userControllers.deleteUser); //delete specific user

router.post('/updatePassword',userControllers.updatePassword); //set new password

router.post('/updateDetails', userControllers.updateDetails); //update user details

router.post('/updateAddress', userControllers.updateAddress); //update user address

router.post('/restoreUser', userControllers.restoreUser); //restore specific user

module.exports = router;