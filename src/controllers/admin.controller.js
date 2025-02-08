const { findUserByPhone } = require('../services/adminService');
const { comparePasswords } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/generateToken');

const adminLogin = async (ctx) => {
  try {
    const { phone, password } = ctx.request.body;
    if (!phone || !password) {
      ctx.status = 400;
      ctx.body = { message: 'Phone and password are required' };
      return;
    }

    const user = await findUserByPhone(phone);
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      ctx.status = 401;
      ctx.body = { message: 'Invalid credentials' };
      return;
    }

    const token = await generateToken(user);

    ctx.status = 200;
    ctx.body = {
      token,
      user: {
        _id: user._id,
        name: user.name,
        type: user.type,
        status: user.status,
      },
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Internal server error', error: error.message };
  }
}
 
module.exports = { adminLogin };