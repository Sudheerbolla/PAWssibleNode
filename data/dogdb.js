var ObjectID = require('mongodb').ObjectID;

const addDog = async(collection, dog) => {
    const newDog = await collection.insertOne(dog);
    return newDog;
}

const updateDog = async(collection, dog) => {
    var newvalues = { "$set": {
        breedname:dog.breedname,
        description:dog.description,
        allergies:dog.allergies,
        likes:dog.likes,
        disLikes:dog.disLikes,
        ownerId:dog.ownerId,
        ageInMonths:dog.ageInMonths,
        hourlyPrice:dog.hourlyPrice,
        photo:dog.photo,
        active:dog.active
    } };
    const resp = await collection.updateOne({"_id":ObjectID(dog.dogId)}, newvalues);
    return dog;
}

const changeDogStatus = async(collection, dog) => {
    var newvalues = { "$set": {
        active:dog.active
    } };
    const newDog = await collection.updateOne({"_id":ObjectID(dog.dogId)}, newvalues);
    return dog;
}

const getDogs = async(collection) => {
    try {
        const results = await collection.find({'active':true}).toArray()
        return results
    } catch (e) {
        throw e
    }
}

const getDogsListUser = async(collection, userId) => {
    try {
        const results = await collection.find({'ownerId': userId}).toArray()
        return results
    } catch (e) {
        throw e
    }
}

const getDogsById = async(collection, dogId) => {
    try {
        const result = await collection.findOne({'_id': ObjectID(dogId)},{})
        return result
    } catch (e) {
        throw e
    }
}

module.exports = { getDogs, addDog, getDogsListUser, updateDog, changeDogStatus, getDogsById }
