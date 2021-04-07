var express = require('express')
var router = express.Router()

var bookingsController = require('../controllers/bookingsController')

router.get('/getOwnerBookings/:userId', bookingsController.getOwnerBookings)

router.get('/getOwnerBookingRequests/:userId', bookingsController.getOwnerBookingRequests)

router.get('/getCustomerBookings/:userId', bookingsController.getCustomerBookings)

router.post('/createBooking', bookingsController.createBooking)

router.get('/changeBookingStatus/:bookingId/:status', bookingsController.changeBookingStatus)

module.exports = router;