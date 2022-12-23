// Initialization

require('dotenv').config()

// Dependencies------------------------------------------
// express
const express = require('express');
const app = express();

const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const db = mongoose.connection;

// Port and Listener ------------------------------------------
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('express is listening on:', PORT));

// MONGO Database------------------------------------------
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Database Connection
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

// Middleware------------------------------------------

// Require CSS
// app.use("/public", express.static(__dirname + "/views/public"));

//use public folder for static assets
app.use(express.static('public'));

// Body parser middleware: it creates req.body
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

// Use method override
// 1. overrides "delete" method using "post" method (in index.ejs)
// 2. ovverrides "put" method using "post" method (in edit.ejs)
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// Controllers ------------------------------------------
const flightsController = require('./controllers/flights.js');

app.use('/flights', flightsController); // Controller automatically goes to /flights/... 


// Routes ------------------------------------------

// Initial landing page (/)
app.get('/', (req, res) => {
  res.render('index.ejs');
});

