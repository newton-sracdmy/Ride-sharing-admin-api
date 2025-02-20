const UserService = require("../services/userService");

const getAllUsers = async (ctx) => {
  try {
    const type = ctx.query.type;
    const page = parseInt(ctx.query.page) || 1;
    const limit = parseInt(ctx.query.limit) || 10;
    const isOnline = ctx.query.isOnline;
    const search = ctx.query.search;

    const usersData = await UserService.getAllUsers(type, page, limit, isOnline, search);
    
    ctx.status = 200;
    ctx.body = { success: true, data: usersData };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false, message: "Internal server error", error };
  }
};


const  getUserById = async  (ctx) => {

    try {

        const { id} = ctx.params;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
          }

        const user  = await UserService.getUserById(id);
        
        if (!user) {
            return { error: "User not found", status: 404 };
          }
         ctx.status = 200;
         ctx.body = { success: true, data:user };
  
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: "Internal server error", error };
      }
}

module.exports = {getAllUsers , getUserById };
