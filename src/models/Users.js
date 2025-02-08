const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['admin', 'user'], default: 'user' },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
