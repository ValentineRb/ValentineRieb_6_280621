// Import the package mongoose and add the plug in.
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Create the database schema.
const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

// Apply the validator.
userSchema.plugin(uniqueValidator);

// Export the model.
module.exports = mongoose.model('User', userSchema);
