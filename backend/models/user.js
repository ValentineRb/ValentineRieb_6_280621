// Import Mongoose and add the plug in.
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Create database schema.
const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Adresse email invalide"]},
  password: {type: String, required: true},
})

// Apply the validator to avoid 
userSchema.plugin(uniqueValidator);

// Export the model.
module.exports = mongoose.model('User', userSchema);
