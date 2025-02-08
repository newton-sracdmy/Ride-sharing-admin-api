const User = require('../models/userModel');

const findUserByPhone = async (phone) => {
  return await User.findOne({ phone });
};

module.exports = { findUserByPhone };
