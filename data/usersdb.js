var ObjectID = require('mongodb').ObjectID;

const performLogin = async(collection, requestBody) => {
    const resp = await collection.findOne({"email": requestBody.email, "password": requestBody.password},{});
    return resp;
}

const addUser = async(collection, user) => {
    const resp = await collection.findOne({"email":user.email},{});
    if(resp) return null;
    else {
        const newUser = await collection.insertOne(user);
        return newUser;    
    } 
}

const updateUser = async(collection, user) => {
    const requestData = JSON.stringify(user)
    var newvalues = { "$set": {
        phone: user.phone,
        name: user.name,
        address: user.address,
        password: user.password
    } };
    
    const resp = await collection.updateOne({"_id":ObjectID(user.userId)}, newvalues);
    return user;
}

const resetPassword = async(collection, user) => {
    var newvalues = { "$set": {
        password: user.password
    } };
    const resp = await collection.updateOne({"email":user.email}, newvalues);
    return user;
}

const getUserById = async(collection, dogId) => {
    try {
        const result = await collection.findOne({'_id': ObjectID(dogId)},{})
        return result
    } catch (e) {
        throw e
    }
}

module.exports = { performLogin, addUser, updateUser, resetPassword, getUserById }
