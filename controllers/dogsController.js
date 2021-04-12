const mongo = require('../data/mongo')
const { getDogs, addDog, updateDog, getDogsListUser, changeDogStatus } = require('../data/dogdb')
const utilClass = require('../utils/UtilClass');
var dogsDataBase = null

exports.getDogsList =  async function(req, res)  {    
    if(dogsDataBase == null) dogsDataBase = await mongo.getDB().collection('dogs')
    res.header("Content-Type: application/json");
    const listDogs = await getDogs(dogsDataBase)
    res.send({"dogs":listDogs}); 
}

exports.getDogsListUser =  async function(req, res)  {    
    if(dogsDataBase == null) dogsDataBase = await mongo.getDB().collection('dogs')
    const userId = req.params.userId
    res.header("Content-Type: application/json");
    const listDogs = await getDogsListUser(dogsDataBase, userId)
    res.send({"dogs":listDogs}); 
}

exports.addDog =  async function(req, res)  {    
    if(dogsDataBase == null) dogsDataBase = await mongo.getDB().collection('dogs')
    var newDog = utilClass.parseDog(req.body, false)
    res.header("Content-Type: application/json");
    newDog = await addDog(dogsDataBase, newDog)
    res.send({"dog":newDog.ops[0]}); 
}

exports.updateDog =  async function(req, res)  {    
    // const db = await mongo.getDB();
    if(dogsDataBase == null) dogsDataBase = await mongo.getDB().collection('dogs')
    var newDog = utilClass.parseDog(req.body, true)
    res.header("Content-Type: application/json");
    newDog = await updateDog(dogsDataBase, newDog)
    res.send({"dog": newDog}); 
}

exports.changeDogStatus =  async function(req, res)  {    
    if(dogsDataBase == null) dogsDataBase = await mongo.getDB().collection('dogs')
    var newDog = {
        dogId:req.body.dogId,
        active:req.body.active
    };
    res.header("Content-Type: application/json");
    newDog = await changeDogStatus(dogsDataBase, newDog)
    res.send({"dog": newDog}); 
}




