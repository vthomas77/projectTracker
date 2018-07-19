const express = require('express');
const app = express();
const config = require('./config/main');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/routes');

//Database connection
mongoose.connect(config.database);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => res.send('Hello World!'))

// Start the server
app.listen(config.port);
console.log('Server is running on port ' + config.port + '.');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router(app);
