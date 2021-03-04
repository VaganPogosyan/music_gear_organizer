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
APP.use(express.static('public'));

// mongoose conection
mongoose.connect('mongodb://localhost:27017/gear', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


// ROUTES
// seed
APP.get('/gear/seed', (req, res) => {
    gearItem.create([
        {
            name: 'Fender CD-60',
            type: 'Electro-Acoustic guitar',
            color: 'NAT',
            needsReplacement: false,
            image: 'https://thumbs.static-thomann.de/thumb/orig/pics/prod/190655.jpg'
        }
    ], (error, data) => {
        res.redirect('/gear');
    });
});

// new
APP.get('/gear/new', (req, res) => {
    res.render('new.ejs');
});

// post/create
APP.post('/gear', (req, res) => {
    gearItem.create(req.body, (error, createdGear) => {
        res.redirect('/gear');
    });
});

// show
APP.get('/gear/:id', (req, res) => {
    gearItem.findById(req.params.id, (error, foundGear) => {
        res.render('show.ejs', {
            gear: foundGear
        });
    });
});

// Get edit
APP.get('/gear/:id/edit', (req, res) => {
    gearItem.findById(req.params.id, (error, foundGear) => {
        res.render('edit.ejs', {
            gear: foundGear
        })
    });
});

// Put edit
APP.put('/gear/:id', (req, res) => {
    console.log(req.body)
    gearItem.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedGear) => {
        res.redirect('/gear/' + req.params.id);
    });

});

// delete
APP.delete('/gear/:id', (req, res) => {
    gearItem.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (error, data) => {
        res.redirect('/gear');
    });
});

// index

/*

{
  'guitar': [{guitar1}, {guitar2}, etc...],
  'keyboard': [{keyboard1}, {keyboard2}, etc...],
  etc...
}

const gearSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String },
    color: { type: String },
    description: { type: String },
    needsReplacement: { type: Boolean },
    image: { type: String }
});


find by type > for loop 

create an empty array where we'll store items found by type 

- if the type exists im appending the item to the array
- if it doesnt put in in an empty array
- 

push found items into an array


- allGuitars
get the type key an
if the type === guitar 

*/


APP.get('/gear', (req, res) => {
    gearItem.find({}, (error, allInstruments) => {
        console.log(allInstruments)
        // allGuitars is all items in our database
        // create an empty object to store all items
        const allItems = {};
        const guitars = [];
        const keyboards = [];
        const otherItems = [];
        // variable to count
        let count = 0;
        // loop thorugh every item in database 
        for (let i = 0; i < allInstruments.length; i++) {
            console.log('~~~~~')
            console.log(allInstruments[i].type);
            // allInstruments[i].type is a value of a key-value pair "type: guitar/keyboard/etc" in each item
            // if that value exists we're appending that key-value pair to allItems via square bracket notation like so: < obj['key'] = 'value' >
            if (allInstruments[i].type) {
                if (allInstruments[i].type === 'guitar') {
                    allItems['guitars'] = guitars;
                    guitars.push(allInstruments[i]);
                    console.log(guitars);
                } else if (allInstruments[i].type === 'keyboard') {
                    allItems['keyboards'] = keyboards;
                    keyboards.push(allInstruments[i]);
                    console.log(keyboards);
                }
                // now we added a key of allInstruments[i].type with a value as an empty array

                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                // console.log('~~~~~~~~~1');
                // console.log(allItems);
            } else {
                // if item doesn't have a type we add to it a key of 'other items' with value of empty array
                allItems['other items'] = otherItems;
                otherItems.push(allInstruments[i]);
                console.log(otherItems);

                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                // console.log('~~~~~~~~~2');
                // console.log(allItems);
            }
        }
        console.log('~~~~~~~~~3');
        console.log(allItems);

        res.render('index.ejs', {
            guitars: allItems.guitars,
            keyboards: allItems.keyboards
        });
    });
});






// listener
APP.listen(PORT, () => {
    console.log('Lisening on port: ' + PORT);
});