// Require express.
const express = require('express');
// Create the router.
const router = express.Router();

// Import the middleware authentification.
const auth = require('../middleware/auth');
// Import the middleware multer.
const multer = require('../middleware/multer-config');

// Import the controller.
const sauceCtrl = require('../controllers/sauce');

// Create the routes.
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce);

// Export the router.
module.exports = router;
