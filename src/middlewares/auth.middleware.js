const jwt = require("jsonwebtoken");
const { statusCodes } = require("../helper/statusCodes");
const { errorResponseHandler } = require("../helper/errorResponseHandler");

const authMiddleware = async (ctx, next) => {
  try {
    const authHeader = ctx.headers.authorization;

    if (!authHeader) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40113,
        },
      });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40114,
        },
      });
    }

    const token = tokenParts[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw Object.assign(new Error(), {
          status: statusCodes.UNAUTHORIZED,
          error: {
            code: 40110, 
          },
        });
      }

      if (err.name === "JsonWebTokenError") {
        throw Object.assign(new Error(), {
          status: statusCodes.UNAUTHORIZED,
          error: {
            code: 40111, 
          },
        });
      }

      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40112,
        },
      });
    }

    if (decoded.type !== "admin") {
      throw Object.assign(new Error(), {
        status: statusCodes.FORBIDDEN,
        error: {
          code: 40301, 
        },
      });
    }

    ctx.state.user = decoded;
    await next();
  } catch (error) {
    errorResponseHandler(error, ctx);
  }
};

module.exports = authMiddleware;
