const {MongoClient} = require('mongodb')
const uri = "mongodb+srv://sudheer:sudheer@cluster0.4agbj.mongodb.net/pawssible?retryWrites=true&w=majority"
let _db

class Mongo {
    
    constructor () {
        this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    async main () {
        await this.client.connect();
        console.log('Connected to MongoDB');
        _db = this.client.db();
    }

    getDB() {
        return _db;
    }
}

module.exports = new Mongo();