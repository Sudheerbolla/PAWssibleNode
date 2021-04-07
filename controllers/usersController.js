const mongo = require('../data/mongo')
const { performLogin, addUser, updateUser, resetPassword } = require('../data/usersdb')
const utilClass = require('../utils/UtilClass');
var usersDataBase = null

exports.performLogin = async function(req, res)  {    
    if(usersDataBase == null) usersDataBase = await mongo.getDB().collection('users')
    res.header("Content-Type: application/json");
    const user = await performLogin(usersDataBase, req.body)
    console.log(user)
    if(user) 
        res.send({"user": user});
    else res.send({"message": "User with email address and password combination not found."}); 
}

exports.addUser = async function(req, res)  {    
    if(usersDataBase == null) usersDataBase = await mongo.getDB().collection('users')
    var user = utilClass.parseUser(req.body,false)
    res.header("Content-Type: application/json");
    user = await addUser(usersDataBase, user)
    if(!user) res.send({"message": "User with email address already exists."});
    else res.send({"user": user.ops[0]}); 
}

exports.updateUser = async function(req, res)  {    
    if(usersDataBase == null) usersDataBase = await mongo.getDB().collection('users')
    var newUser = utilClass.parseUser(req.body,true)
    res.header("Content-Type: application/json");
    newUser = await updateUser(usersDataBase, newUser)
    res.send({"user": newUser}); 
}

exports.resetPassword = async function(req, res)  {    
    if(usersDataBase == null) usersDataBase = await mongo.getDB().collection('users')
    var newUser = {
        email: req.body.email,
        password: req.body.password
    };
    res.header("Content-Type: application/json");
    newUser = await resetPassword(usersDataBase, newUser)
    res.send({"user": newUser}); 
}




