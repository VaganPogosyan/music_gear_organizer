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


// // ROUTES
// // seed
// APP.get('/gear/seed', (req, res) => {
//     gearItem.create([
//         {
//             name: 'Fender CD-60CE',
//             type: 'guitar',
//             color: 'NAT',
//             needsReplacement: false,
//             description: "Electro-acoustic guitar",
//             image: 'https://cdn11.bigcommerce.com/s-49c12/images/stencil/1280x1280/products/9848/17068/apixnxqhv__77307.1523375085.jpg?c=2'
//         },
//         {
//             name: 'AKAI MPK mini',
//             type: 'keyboard',
//             color: 'Black',
//             needsReplacement: false,
//             description: "MIDI keyboard",
//             image: 'https://dt7v1i9vyp3mf.cloudfront.net/styles/news_large/s3/imagelibrary/A/AkaiMPKMini_01-Fqt73Lxog0.DPKPDFRpTc3jdBbPXb.Ak.jpg'
//         },
//         {
//             name: 'Easter 22inch Drum Set',
//             type: 'drums',
//             color: 'Black',
//             needsReplacement: false,
//             description: "Drumset with four main drums and two cymbals",
//             image: 'https://images-na.ssl-images-amazon.com/images/I/71nJgkQau1L._AC_SL1500_.jpg'
//         },
//         {
//             name: 'Hosa GTR',
//             type: 'other items',
//             color: 'Black',
//             needsReplacement: false,
//             description: "Guitar cable",
//             image: 'https://m.media-amazon.com/images/I/41t0RbRKkvL._AC_.jpg'
//         },
//         {
//             name: 'Fender Stratocaster',
//             type: 'guitar',
//             color: 'Gold',
//             needsReplacement: false,
//             description: "Electric guitar",
//             image: 'https://media.sweetwater.com/api/i/q-82__ha-01b7239fc18f7036__hmac-2528d6ff549631ed535f2eec664dbe970e6264e8/images/closeup/750-Strat75MDA_front.jpg'
//         },
//         {
//             name: 'Ukulele',
//             type: 'guitar',
//             color: 'Mahogany',
//             needsReplacement: false,
//             description: "Small ukulele guitar",
//             image: 'https://images-na.ssl-images-amazon.com/images/I/715H8YOm4rL._AC_SY879_.jpg'
//         },
//         {
//             name: 'Fender Mustang LT25',
//             type: 'other items',
//             color: 'Black',
//             needsReplacement: false,
//             description: "Amplifier",
//             image: 'https://thumbs.static-thomann.de/thumb/orig/pics/bdb/456903/13933481_800.jpg'
//         },
//         {
//             name: 'Samson C01PRO',
//             type: 'other items',
//             color: 'Silver',
//             needsReplacement: false,
//             description: "USB condenser microphone",
//             image: 'http://www.samsontech.com/site_media/cms/collateral_images/samson-c01u-pro/co1u_pro_stand_1.jpg'
//         }
//     ], (error, data) => {
//         res.redirect('/gear');
//     });
// });

// // new
// APP.get('/gear/new', (req, res) => {
//     res.render('new.ejs');
// });

// // post/create
// APP.post('/gear', (req, res) => {
//     if (req.body.needsReplacement === 'on') {
//         req.body.needsReplacement = true;
//     } else {
//         req.body.needsReplacement = false;
//     };
//     gearItem.create(req.body, (error, createdGear) => {
//         res.redirect('/gear');
//     });
// });

// // show
// APP.get('/gear/:id', (req, res) => {
//     gearItem.findById(req.params.id, (error, foundGear) => {
//         res.render('show.ejs', {
//             gear: foundGear
//         });
//     });
// });

// // Get edit
// APP.get('/gear/:id/edit', (req, res) => {
//     gearItem.findById(req.params.id, (error, foundGear) => {
//         res.render('edit.ejs', {
//             gear: foundGear
//         })
//     });
// });

// // Put edit
// APP.put('/gear/:id', (req, res) => {
//     if (req.body.needsReplacement === 'on') {
//         req.body.needsReplacement = true;
//     } else {
//         req.body.needsReplacement = false;
//     };
//     gearItem.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedGear) => {
//         res.redirect('/gear/' + req.params.id);
//     });

// });

// // delete
// APP.delete('/gear/:id', (req, res) => {
//     gearItem.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (error, data) => {
//         res.redirect('/gear');
//     });
// });

// // index
// APP.get('/gear', (req, res) => {
//     gearItem.find({}, (error, allInstruments) => {
//         console.log(allInstruments)
//         // allGuitars is all items in our database
//         // create an empty object to store all items
//         const allItems = {};
//         const guitars = [];
//         const keyboards = [];
//         const drums = [];
//         const otherItems = [];
//         // variable to count
//         let count = 0;
//         // loop thorugh every item in database 
//         for (let i = 0; i < allInstruments.length; i++) {
//             console.log('~~~~~')
//             console.log(allInstruments[i].type);
//             // allInstruments[i].type is a value of a key-value pair "type: guitar/keyboard/etc" in each item
//             // if that value exists we're appending that key-value pair to allItems via square bracket notation like so: < obj['key'] = 'value' >
//             if (allInstruments[i].type) {
//                 if (allInstruments[i].type === 'guitar') {
//                     allItems['guitars'] = guitars;
//                     guitars.push(allInstruments[i]);
//                     console.log(guitars);
//                 } else if (allInstruments[i].type === 'keyboard') {
//                     allItems['keyboards'] = keyboards;
//                     keyboards.push(allInstruments[i]);
//                     console.log(keyboards);
//                 } else if (allInstruments[i].type === 'drums') {
//                     allItems['drums'] = drums;
//                     drums.push(allInstruments[i]);
//                     console.log(drums);
//                 } else if (allInstruments[i].type === 'other items') {
//                     allItems['other items'] = otherItems;
//                     otherItems.push(allInstruments[i]);
//                     console.log(otherItems);
//                 }
//             }
//         }
//         console.log('~~~~~~~~~3');
//         console.log(allItems);

//         res.render('index.ejs', {
//             guitars: allItems.guitars,
//             keyboards: allItems.keyboards,
//             drums: allItems.drums,
//             otherItems: allItems['other items']
//         });
//     });
// });






// listener
APP.listen(PORT, () => {
    console.log('Lisening on port: ' + PORT);
});