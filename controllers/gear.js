const express = require('express');
const ROUTER = express.Router();
const gearItem = require('../models/gear.js');

ROUTER.use()

// ROUTES
// seed
// ROUTER.get('/seed', (req, res) => {
//     gearItem.create([
//         {
//             name: 'Fender CD-60',
//             type: 'Elctro-Acoustic cuitar',
//             color: 'NAT',
//             needsReplacement: false,
//             image: 'https://thumbs.static-thomann.de/thumb/orig/pics/prod/190655.jpg'
//         }
//     ]);
// });

// index
ROUTER.get('/gear', (req, res) => {
    res.send('hello world')
});