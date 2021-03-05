const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const APP = express();
// const PORT = 3000;
const db = mongoose.connection;

// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + `gear`;

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open', () => { });



// mongoose conection
// mongoose.connect('mongodb://localhost:27017/gear', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', () => {
//     console.log('connected to mongo');
// });


// controller logic
const gearController = require('./controllers/gear.js');
APP.use(gearController);

// middleware to help with the form submission
APP.use(express.urlencoded({ extended: true }));
APP.use(methodOverride('_method'));
APP.use(express.static('public'));




// listener
APP.listen(PORT, () => {
    console.log('Lisening on port: ' + PORT);
});