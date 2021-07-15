// Import packages:
// Express package.
const express = require('express');
// Mongoose package.
const mongoose = require('mongoose');
// Dotenv package.
require('dotenv').config({path : ".env"});

// Declare the constant which is the application.
const app = express();

// Connect the API to the database MongoDB.
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Add the headers to the object response and avoid any CORS.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Change the request body into object JS usable.
app.use(express.json());

// Export the application to use it anywhere in the project.
module.exports = app;