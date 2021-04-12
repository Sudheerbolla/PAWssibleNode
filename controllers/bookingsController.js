const mongo = require('../data/mongo')
const { getCustomerBookings, getOwnerBookings, getOwnerBookingRequests, createBooking, changeBookingStatus } = require('../data/bookingsdb')

var usersDataBase = null
var bookingsDataBase = null
var dogsDataBase = null

exports.getCustomerBookings =  async function(req, res)  {    
    if(bookingsDataBase == null) bookingsDataBase = await mongo.getDB().collection('bookings')
    if(usersDataBase == null) usersDataBase = await mongo.getDB().collection('users')
    if(dogsDataBase == null) dogsDataBase = await mongo.getDB().collection('dogs')
    const userId = req.params.userId
    res.header("Content-Type: application/json");
    const listBookings = await getCustomerBookings(bookingsDataBase, usersDataBase, dogsDataBase , userId)
    res.send({"bookings": listBookings}); 
}

exports.getOwnerBookings =  async function(req, res)  {    
    if(bookingsDataBase == null) bookingsDataBase = await mongo.getDB().collection('bookings')
    if(usersDataBase == null) usersDataBase = await mongo.getDB().collection('users')
    if(dogsDataBase == null) dogsDataBase = await mongo.getDB().collection('dogs')
    const userId = req.params.userId
    res.header("Content-Type: application/json");
    const listBookings = await getOwnerBookings(bookingsDataBase, usersDataBase, dogsDataBase, userId)
    res.send({"bookings": listBookings}); 
}

exports.getOwnerBookingRequests =  async function(req, res)  {    
    if(bookingsDataBase == null) bookingsDataBase = await mongo.getDB().collection('bookings')
    if(usersDataBase == null) usersDataBase = await mongo.getDB().collection('users')
    if(dogsDataBase == null) dogsDataBase = await mongo.getDB().collection('dogs')
    const userId = req.params.userId
    res.header("Content-Type: application/json");
    const listBookings = await getOwnerBookingRequests(bookingsDataBase, usersDataBase, dogsDataBase, userId)
    res.send({"bookings": listBookings}); 
}

exports.createBooking = async function(req, res)  {    
    if(bookingsDataBase == null) bookingsDataBase = await mongo.getDB().collection('bookings')
    var booking = req.body
    res.header("Content-Type: application/json");
    booking = await createBooking(bookingsDataBase, booking)
    res.send({"booking": booking.ops[0]}); 
}

// status - R - requested, X - Cancelled/Rejected, C - Completed, P - Accepted
exports.changeBookingStatus = async function(req, res)  {
    if(bookingsDataBase == null) bookingsDataBase = await mongo.getDB().collection('bookings')
    res.header("Content-Type: application/json");
    await changeBookingStatus(bookingsDataBase, req.params.bookingId, req.params.status )
    res.send({"message": "Updated Booking"}); 
}



