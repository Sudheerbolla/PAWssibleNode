var express = require('express')
var router = express.Router()

var usersController = require('../controllers/usersController')

router.post('/login', usersController.performLogin)

router.post('/addUser', usersController.addUser)

router.post('/updateUser', usersController.updateUser)

router.post('/resetPassword', usersController.resetPassword)

module.exports = router;