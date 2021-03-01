// schema

const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String },
    color: { type: String },
    description: { type: String },
    needsReplacement: { type: Boolean },
    image: { type: String }
});

const gearItem = mongoose.model('gearItem', gearSchema);

module.exports = gearItem;

