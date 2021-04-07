const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongo = require('./data/mongo');

const app = express();
const port = 8000

app.use(bodyParser.json());
app.use(cors());

const dogsRouter = require('./routes/dogsRoute');
const bookingsRouter = require('./routes/bookingsRoute');
const usersRouter = require('./routes/usersRoute');

app.use('/users', usersRouter)
app.use('/dogs', dogsRouter)
app.use('/bookings', bookingsRouter)

const boot = async () => {
    await mongo.main();
    app.listen(port, () => {
        console.log(`PAWSsible Web Services on port ${port}`)
    })
};

boot();