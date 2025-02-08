
const jwt = require("jsonwebtoken");

const authMiddleware = async (ctx, next) => {
    try {
      const authHeader = ctx.headers.authorization;
  
      if (!authHeader) {
        ctx.status = 401;
        ctx.body = { success: false, message: "Unauthorized: No token provided" };
        return;
      }
  
      const tokenParts = authHeader.split(" ");
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        ctx.status = 401;
        ctx.body = { success: false, message: "Unauthorized: Invalid token format" };
        return;
      }
  
      const token = tokenParts[1];
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (decoded.type !== "admin") {
        ctx.status = 403;
        ctx.body = { message: "Access Forbidden. Admins only." };
        return;
      }
      ctx.state.user = decoded;
      await next();
    } catch (error) {
      ctx.status = 401;
      ctx.body = { success: false, message: "Unauthorized: Invalid token" };
    }
  };
  
  module.exports = authMiddleware;
  