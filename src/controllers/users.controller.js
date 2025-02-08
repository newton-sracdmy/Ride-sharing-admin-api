const UserService = require("../services/userService");

const getAllUsers = async (ctx) => {
  try {
    const page = parseInt(ctx.query.page) || 1;
    const limit = parseInt(ctx.query.limit) || 10;
    const usersData = await UserService.getAllUsers(page, limit);
    ctx.status = 200;
    ctx.body = { success: true, data: usersData };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false, message: "Internal server error", error };
  }
};

module.exports = {getAllUsers };
