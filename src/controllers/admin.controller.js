const { findUserByPhone } = require('../services/adminService');
const { comparePasswords } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/generateToken');
const { validateAdminLogin } = require('../helper/validationHelper');
const { statusCodes } = require('../helper/statusCodes');
const { errorResponseHandler } = require('../helper/errorResponseHandler');

const adminLogin = async (ctx) => {
  try {
    const { phone, password } = ctx.request.body;
    const { error } = validateAdminLogin({ phone, password });
    if (error) {
      throw Object.assign(new Error(), {
        status:statusCodes.BAD_REQUEST,
        error: {
          code: 40001,
        },
      });
    }

    const user = await findUserByPhone(phone);
    if (!user) {
      throw Object.assign(new Error(), {
        status: statusCodes.NOT_FOUND,
        error: {
          code: 40401,
        },
      });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40101,
        },
      });
    }

    const token = await generateToken(user);

    return ctx.ok(
      {
        token,
        user: {
          _id: user._id,
          name: user.name,
          type: user.type,
          status: user.status,
        },
      },
      'Login successful'
    );
  } catch (error) {
    errorResponseHandler(error, ctx);
  }
}
 
module.exports = { adminLogin };