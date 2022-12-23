const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    name: String
}, {
    timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;