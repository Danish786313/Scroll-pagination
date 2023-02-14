var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/users', usersController.getAllUsers);


module.exports = router;