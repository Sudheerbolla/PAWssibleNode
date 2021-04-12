var ObjectID = require('mongodb').ObjectID;
const utilClass = require('../utils/UtilClass');

const createBooking = async(collection, booking) => {
    const newBooking = await collection.insertOne(booking);
    return newBooking;
}

// status - R - requested, X - cancelled, C - Completed, P - Accepted

const changeBookingStatus = async(collection, bookingId, status) => {
    var newvalues = { "$set": {
        'status': status
    } };
    const newBooking = await collection.updateOne({"_id": ObjectID(bookingId)}, newvalues);
    return bookingId;
}

const getCustomerBookings = async(bookingsCollection, usersCollection, dogsCollection, userId) => {
    try {
        const results = await bookingsCollection.find({'customerId': userId}).toArray()
        var promises = results.map(async function (booking) {
            const dog = await dogsCollection.findOne({'_id': ObjectID(booking.dogId)},{})
            const customer = await usersCollection.findOne({'_id': ObjectID(booking.customerId)},{})
            const owner = await usersCollection.findOne({'_id': ObjectID(booking.ownerId)},{})
            return utilClass.parseBooking(booking, customer, owner, dog);
        });
        const outPut = await Promise.all(promises)
        return outPut
    } catch (e) {
        throw e
    }
}

const getOwnerBookings = async(bookingsCollection, usersCollection, dogsCollection, userId) => {
    try {
        const results = await bookingsCollection.find({'ownerId': userId}).toArray()
        var promises = results.map(async function (booking) {
            const dog = await dogsCollection.findOne({'_id': ObjectID(booking.dogId)},{})
            const customer = await usersCollection.findOne({'_id': ObjectID(booking.customerId)},{})
            const owner = await usersCollection.findOne({'_id': ObjectID(booking.ownerId)},{})
            return utilClass.parseBooking(booking, customer, owner, dog);
        });
        const outPut = await Promise.all(promises)
        return outPut
    } catch (e) {
        throw e
    }
}

const getOwnerBookingRequests = async(bookingsCollection, usersCollection, dogsCollection, userId) => {
    try {
        const results = await bookingsCollection.find({'ownerId': userId, 'status':'R'}).toArray()
        var promises = results.map(async function (booking) {
            const dog = await dogsCollection.findOne({'_id': ObjectID(booking.dogId)},{})
            const customer = await usersCollection.findOne({'_id': ObjectID(booking.customerId)},{})
            const owner = await usersCollection.findOne({'_id': ObjectID(booking.ownerId)},{})
            return utilClass.parseBooking(booking, customer, owner, dog);
        });
        const outPut = await Promise.all(promises)
        return outPut
    } catch (e) {
        throw e
    }
}

module.exports = { getCustomerBookings, getOwnerBookings, getOwnerBookingRequests, createBooking, changeBookingStatus }
