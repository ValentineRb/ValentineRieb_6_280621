// Import packages and files.
const Sauce = require('../models/Sauce');

// Get all sauces (Get/api/sauces).
// Use find method to get an array with all the sauces in the the database.
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    // Send a promise with the sauces to the frontend.
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// Create new sauce (Post/api/sauces).
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  // Delete the id from the frontend.
  delete sauceObject._id;
  // Create an instance of the object Sauce.
  const sauce = new Sauce({
    ...sauceObject,
    // Create the URL of the image: http://localhost:3000/images/filename.
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  // Save in the database.
  sauce.save()
    // Avoid expiration of the request with a response.
    .then(() => res.status(201).json({ message: 'Nouvelle sauce ajoutée.' }))
    .catch((error) => res.status(400).json({ error }));
};

// Get only one sauce with its id (Get/api/sauces/:id).
// Use findOne method to find the sauce which has the same _id as the param of the request.
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    // Send a promise with the sauce to the frontend.
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Modify sauce (Put/api/sauces/:id).
exports.modifySauce = (req, res, next) => {
  // Check if an image is downloaded, if yes update the URL.
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };
  // Use updateOne method with the initial object as first arg and the new version as a second arg.
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée.' }))
    .catch((error) => res.status(400).json({ error }));
};

// Delete sauce (Delete/api/sauces/:id).
// Use deleteOne method.
exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée.' }))
    .catch((error) => res.status(400).json({ error }));
};

// Like or dislike a sauce (Post/api/sauces/:id/like).
exports.likeOrDislikeSauce = (req, res, next) => {
  // If user likes the sauce.
  if (req.body.like === 1) {
    // Add 1 like and send it in the array of usersLiked.
    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
      .then((sauce) => res.status(200).json({ message: 'Like ajouté !' }))
      .catch(error => res.status(400).json({ error }));
    // If user does not like the sauce.
  } else if (req.body.like === -1) {
    // Add 1 dislike and send it in the array of usersDisliked.
    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } }) 
      .then((sauce) => res.status(200).json({ message: 'Dislike ajouté !' }))
      .catch(error => res.status(400).json({ error }));
    // If like === 0, cancel the user vote.
  } else {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        // Check if the array userLiked contains the userId:
        // Delete 1 like from the array userLiked.
        if (sauce.usersLiked.includes(req.body.userId)) { 
          Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
              .then((sauce) => { res.status(200).json({ message: 'Like supprimé !' }) })
              .catch(error => res.status(400).json({ error }))
          // If array userDisliked contains the userId:
          // Delete 1 dislike of the array userDisliked.
        } else if (sauce.usersDisliked.includes(req.body.userId)) { 
            Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
              .then((sauce) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
              .catch(error => res.status(400).json({ error }))
        }
      })
      .catch(error => res.status(400).json({ error }));
  }
};
