const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String,
  resetToken: String,
  resetExpires: Date,
});
module.exports = mongoose.model('User', userSchema);
