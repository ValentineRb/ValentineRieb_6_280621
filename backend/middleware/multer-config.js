// Import package multer to manage the files send with http requests.
const multer = require('multer');

// Create dictionnary which is an objet.
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Create an object of configuration.
const storage = multer.diskStorage({
  // 1. Where to save the file.
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // 2. Which name: create new name and add an extension.
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Export multer configured.
module.exports = multer({storage: storage}).single('image');
