const express = require('express');

const registerController = require('../controllers/register-controller');


const router = express.Router(); //import routes


//register routes

router.post('/',registerController.register); //check credentials

module.exports = router;