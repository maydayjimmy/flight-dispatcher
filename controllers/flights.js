// Initialization
const express = require('express');
const router = express.Router();

// Imports------------------------------------------------
// Import flights.js
const Flight = require("../models/flights.js")

// Import seed.js (seed data)
const seed = require('../models/seed.js')

//_________________________________________________________________
// Routes
//_________________________________________________________________

// Seed Route
router.get("/seed", (req, res) => {
    // 1. delete all the records from the collection
    Flight.deleteMany({}, (err) => {
    // 2. create a seperate file of records representing product records
    // 3. add the new records (seed data) to the collection
        Flight.create(seed , (err) => { // imports "data" file from top
            // 4. redirect the client to the products index
            res.redirect('/flights')
        })
    })
})

//-------------------------------
// For each route 
// 1. create link in index.ejs
// 2. create route in server.js
// 3. create route ejs file

// Get flight index page (I)
router.get('/', (req, res) => {
    Flight.find({}, (err, foundFlights) => {
        res.render('flights/index.ejs', {
            flights: foundFlights
        });
    })
});

// Get flight new page (N)
router.get('/new', (req, res) => {
    res.render('flights/new.ejs');
});

// Delete flight (D)
router.delete('/:id', (req, res) => {
    Flight.findByIdAndRemove(req.params.id, () => {
        res.redirect('/flights');
    });
});

// Put flight update (U)
router.put('/:id', (req, res) => {
    Flight.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/flights');
    });
});

// Post create flight (C)
router.post('/', (req, res) => {
    Flight.create(req.body, (err, createdFlight) => {
        res.redirect('/flights');
    });
});

// // Get edit flight page (E)
// router.get('/:id/edit', (req, res) => {
//     Flight.findById(req.params.id, (err, foundFlight) => {
//         res.render('flights/edit.ejs', {
//             flight: foundFlight
//         });
//     });
// });

// Get flight show page (S)
router.get('/:id', (req, res) => {
    Flight.findById(req.params.id, (err, foundFlight) => {
        res.render('flights/show.ejs', {
            flight: foundFlight
        });
    });
});


module.exports = router;



