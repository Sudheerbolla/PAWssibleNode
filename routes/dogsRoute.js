var express = require('express')
var router = express.Router()

var dogsController = require('../controllers/dogsController.js')

router.get('/', dogsController.getDogsList)

router.get('/:userId', dogsController.getDogsListUser)

router.post('/addDog', dogsController.addDog)

router.post('/updateDog', dogsController.updateDog)

router.post('/changeDogStatus', dogsController.changeDogStatus)

module.exports = router;