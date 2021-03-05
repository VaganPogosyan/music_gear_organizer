const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const APP = express();
const PORT = 3000;

// controller logic
const gearController = require('./controllers/gear.js');
APP.use(gearController);

// middleware to help with the form submission
APP.use(express.urlencoded({ extended: true }));
APP.use(methodOverride('_method'));
APP.use(express.static('public'));

// mongoose conection
mongoose.connect('mongodb://localhost:27017/gear', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


// listener
APP.listen(PORT, () => {
    console.log('Lisening on port: ' + PORT);
});