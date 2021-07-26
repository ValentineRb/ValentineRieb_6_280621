// Import the package jsonwebtoken.
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get the token in the authorization header from the request.
    const token = req.headers.authorization.split(' ')[1];
    // Decode the token.
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Get the user Id which is in the JS object.
    const userId = decodedToken.userId;
    // Check if the request has an user ID and compare with the user ID extracts from the token.
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable.';
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: error | 'Requête non authentifiée' });
  }
};
