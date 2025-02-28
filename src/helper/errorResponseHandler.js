const { errorCodes } = require('./errorCodes.js');
const { stringifySafe } = require('./stringifySafe.js');

function getErrData(err) {
  if (err) {
    if (err.response && err.response.data) {
      return err.response.data.data || err.response.data;
    } else if (err.data) {
      return err.data.errors || err.data;
    } else if (err.errors) {
      return err.errors;
    }
  }
  return {};
}

function getErrError(err) {
  if (err) {
    let errorData = {};
    if (err.error) {
      errorData = err.error;
    } else if (err.response && err.response.error) {
      errorData = err.response.error;
    }
    const { customMessage, ...errorObj } = errorData;
    errorData = { ...errorObj };
    if (errorCodes[errorData.code]) {
      errorData = { ...errorData, ...errorCodes[errorData.code] };
    }

    if (!Object.keys(errorData).length && err.response && err.response.data) {
      errorData = { ...err.response.data.error };
    }
    if (customMessage) {
      errorData["message"] = customMessage;
    }
    return errorData;
  }
  return {};
}

const errorResponseHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const {
      status = 500,
      title = null,
      errors = null,
      request = {},
      statusText = null,
      message,
      code
    } = err.response ? err.response : err;
    const instance = ctx.request.path;
    let errorTitle;

    const data = getErrData(err);
    const error = getErrError(err);

    ctx.status = status;

    if (code === "23505") {
      ctx.status = 409;
      ctx.body = {
        title: message,
        instance,
        ...data,
        error: error || { message: 'An unexpected error occurred, please try again later.' }
      };
      return;
    }

    switch (status) {
      case 400:
        ctx.body = {
          title: message,
          instance,
          ...data,
          error
        };
        break;
      case 401:
        ctx.body = {
          title: title || statusText || "Authentication Failed",
          instance,
          ...data,
          error
        };
        break;
      case 403:
        ctx.body = {
          title: message || title,
          instance,
          error
        };
        break;
      case 404:
        ctx.body = {
          title: title || statusText,
          instance,
          ...data,
          error
        };
        break;
      case 409:
        ctx.body = {
          title: title || statusText,
          instance,
          ...data,
          error
        };
        break;
      case 422:
        ctx.body = {
          title: message || "Something went wrong.",
          instance,
          ...data,
          error
        };
        break;
      case 503:
        errorTitle =
          title ||
          statusText ||
          (err.source !== undefined
            ? `${err.source} unavailable`
            : "Service unavailable");
        console.error(stringifySafe(err, null, 2));
        ctx.body = { status: 503, title: errorTitle, error };
        break;
      default:
        errorTitle =
          title ||
          statusText ||
          (err.source !== undefined
            ? `${err.source} Internal Error`
            : "Internal Error");
        console.error(stringifySafe(err, null, 2));
        ctx.body = {
          status,
          title: errorTitle,
          instance,
          error
        };
    }
  }
};

module.exports = {
  errorResponseHandler
};
