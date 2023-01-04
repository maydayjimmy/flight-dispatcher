const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    number: { type: Number},
    aircraft: { type: String},
    dep: { type: String},
    dest: { type: String},
    maxAlt: { type: Number},
    route: { type: String},
    PIC: { type: String},
    FO: { type: String},
},
{
    timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;