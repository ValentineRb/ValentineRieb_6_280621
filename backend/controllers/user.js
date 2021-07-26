// Import the necessary packages and files.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const MaskData = require('maskdata');

// Create new user.
exports.signup = (req, res, next) => {
  // 1. Hash the password 10 times, with an asynchronous function.
  bcrypt.hash(req.body.password, 10)
  // 2. Promise sent, hash received.
    .then(hash => {
      const emailMask2Options = {
        maskWith: "*",
        unmaskedStartCharactersBeforeAt: 2,
        unmaskedEndCharactersAfterAt: 3,
        maskAtTheRate: false
    }
    const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);
      // 3. New user created.
      const user = new User({
        // Email received form the request body.
        email: maskedEmail,
        // Password saved with the hash.
        password: hash
      });
      // 4. Save in the database.
      user.save()
      // 5. Send a reply: success or error.
        .then(() => res.status(201).json({ message: 'Nouvel utilisateur créé.' }))
        .catch(error => res.status(400).json({ message: 'error' }));
    })
    .catch(error => res.status(500).json({ error }));
  };

// Login for existing user.
exports.login = (req, res, next) => {
  const emailMask2Options = {
    maskWith: "*",
    unmaskedStartCharactersBeforeAt: 2,
    unmaskedEndCharactersAfterAt: 3,
    maskAtTheRate: false
}
const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);
  // 1. Find the user in the database.
  User.findOne({ email: maskedEmail })
    .then(user => {
      // If user does not exist, sent an error.
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé.' });
      }
      // 2. Compare passwords between the request and the database.
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
          }
          res.status(200).json({
            userId: user._id,
            // Create a token to secure the user account.
            token: jwt.sign({userId: user._id},'RANDOM_TOKEN_SECRET',{expiresIn: '24h'})
          });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};
