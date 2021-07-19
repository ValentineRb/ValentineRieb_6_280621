// Import packages and files.
const Sauce = require('../models/Sauce');

// Get all sauces (Get/api/sauces).
exports.getAllSauces = (req, res, next) => {
  // Use find method to get an array with all the sauces in the the database.
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({ error }));
};

// Create new sauce (Post/api/sauces).
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  // Delete the id from the frontend.
  delete sauceObject._id;
  // Create instance of the object Sauce.
  const sauce = new Sauce ({
    ...sauceObject,
    // Create the URL of the image: http://localhost:3000/images/filename.
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  // Save in the database.
  sauce.save()
  // Avoid expiration of the request with a response.
  .then(() => res.status(201).json({ message: 'Nouvelle sauce ajoutée.'}))
  .catch(error => res.status(400).json({ error }));
};

// Get only one sauce with its id (Get/api/sauces/:id).
exports.getOneSauce = (req, res, next) => {
  // Use findOne method to find the sauce which has the same _id as the param of the request.
  Sauce.findOne({ _id: req.params.id })
  // Send a promise with the sauce to the frontend.
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({ error }));
};

// Modify sauce (Put/api/sauces/:id).
exports.modifySauce = (req, res, next) => {
  // Check if an image is downloaded, if yes update the URL.
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body}
  // Use updateOne method with: first arg is the initial object and second arg is the new version.
  Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
  .then(() => res.status(200).json({ message: 'Sauce modifiée.'}))
  .catch(error => res.status(400).json({ error }));
};

// Delete sauce (Delete/api/sauces/:id).
exports.deleteSauce = (req, res, next) => {
  // Use deleteOne method.
  Sauce.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Sauce supprimée.'}))
  .catch(error => res.status(400).json({ error }));
};




// Like or dislike a sauce (Post/api/sauces/:id/like).
// exports.likeOrDislikeSauce = 

