const { statusCodes } = require('./statusCodes.js');
const { errorCodes } = require('./errorCodes.js');

function getErrorBlock(code, message) {
  const errorObj = {};
  errorObj.code = code;
  Object.assign(errorObj, errorCodes[code]);
  if (message) {
    errorObj.message = message;
  }
  return errorObj;
}

const responseHandler = () => {
  return async (ctx, next) => {
    ctx.statusCodes = statusCodes;

    ctx.textOk = text => {
      ctx.status = statusCodes.OK;
      ctx.body = text;
    };

    ctx.success = (data = null, message = null, error = {}) => {
      ctx.status = ctx.status < 400 ? ctx.status : statusCodes.OK;
      ctx.body = { status: "success", data, error, message };
    };

    ctx.fail = (data = null, message = null, error = {}) => {
      ctx.status = ctx.status >= 400 && ctx.status < 500 ? ctx.status : statusCodes.BAD_REQUEST;
      ctx.body = { status: "fail", data, error, message };
    };

    ctx.error = (code = null, message = null, error = {}) => {
      ctx.status = ctx.status < 500 ? statusCodes.INTERNAL_SERVER_ERROR : ctx.status;
      ctx.body = { status: "error", code, error, message };
    };

    ctx.okFail = (data = null, message = null, errorCode, errData = null) => {
      ctx.status = statusCodes.OK;
      const error = getErrorBlock(errorCode, message);
      if (errData) {
        error.data = errData;
      }
      ctx.success(data, message || error.message, error);
    };

    ctx.ok = (data, message) => {
      ctx.status = statusCodes.OK;
      ctx.success(data, message);
    };

    ctx.created = (data, message) => {
      ctx.status = statusCodes.CREATED;
      ctx.success(data, message);
    };

    ctx.accepted = (data, message) => {
      ctx.status = statusCodes.ACCEPTED;
      ctx.success(data, message);
    };

    ctx.noContent = (data, message) => {
      ctx.status = statusCodes.NO_CONTENT;
      ctx.success(data, message);
    };

    ctx.badRequest = (data, message, error) => {
      ctx.status = statusCodes.BAD_REQUEST;
      ctx.fail(data, message, error);
    };

    ctx.unauthorized = (data, message, error) => {
      ctx.status = statusCodes.UNAUTHORIZED;
      ctx.fail(data, message, error);
    };

    ctx.forbidden = (data, message, error) => {
      ctx.status = statusCodes.FORBIDDEN;
      ctx.fail(data, message, error);
    };

    ctx.notFound = (data, message, error) => {
      ctx.status = statusCodes.NOT_FOUND;
      ctx.fail(data, message, error);
    };

    ctx.internalServerError = (code, message, error) => {
      ctx.status = statusCodes.INTERNAL_SERVER_ERROR;
      ctx.error(code, message, error);
    };

    ctx.notImplemented = (code, message, error) => {
      ctx.status = statusCodes.NOT_IMPLEMENTED;
      ctx.error(code, message, error);
    };

    ctx.conflict = (data, message, error) => {
      ctx.status = statusCodes.CONFLICT;
      ctx.fail(data, message, error);
    };

    ctx.serviceUnavailable = (code, message, error) => {
      ctx.status = statusCodes.SERVICE_UNAVAILABLE;
      ctx.error(code, message, error);
    };

    await next();
  };
};

module.exports = { responseHandler };
