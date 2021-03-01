const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const APP = express();
const PORT = 3000;
const gearItem = require('./models/gear.js');

// controller logic
// const gearController = require('./controllers/gear.js');
// APP.use(gearController);

// middleware to help with the form submission
APP.use(express.urlencoded({ extended: true }));
APP.use(methodOverride('_method'));

// mongoose conection
mongoose.connect(`mongodb://localhost:27017/gear`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


// ROUTES

// seed
APP.get('/gear/seed', (req, res) => {
    gearItem.create([
        {
            name: 'Fender CD-60',
            type: 'Elctro-Acoustic cuitar',
            color: 'NAT',
            needsReplacement: false,
            image: 'https://thumbs.static-thomann.de/thumb/orig/pics/prod/190655.jpg'
        }
    ]);
    res.redirect('/gear');
});


// index
APP.get('/gear', (req, res) => {
    gearItem.find({}, (error, allGear) => {
        res.render('index.ejs', {
            gear: allGear
        });
    });
});
















// listener
APP.listen(PORT, () => {
    console.log('Lisening on port: ' + PORT);
});