// Import packages:
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path : ".env"});
const path = require('path');
// const bodyParser = require('body-parser');

// Import the routers.
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user');

// Declare the constant which is the application.
const app = express();

// Connect the API to the database MongoDB.
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  mongoose.set('useCreateIndex', true);

// Add the headers to the object response and avoid any CORS.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Change the request body into object JS usable.
app.use(express.json());
// app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Use the routers for all the requests to /api/sauce and /api/auth.
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// Export the application to use it anywhere in the project.
module.exports = app;