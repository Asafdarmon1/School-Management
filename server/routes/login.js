const express = require('express');

const loginController = require('../controllers/login-controller');

const router = express.Router(); //import routes


//register routes

router.post('/',loginController.login); //check credentials

module.exports = router;