const Users = require('../models/Users');

const findUserByPhone = async (phone) => {
  return await Users.findOne({ phone });
};

module.exports = { findUserByPhone };
