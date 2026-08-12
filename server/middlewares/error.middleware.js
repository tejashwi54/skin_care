const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  const isOperationalError = err instanceof ApiError;

  const statusCode = isOperationalError
    ? err.statusCode
    : 500;

  const message = isOperationalError
    ? err.message
    : "Internal Server Error";

  const response = {
    success: false,
    statusCode,
    message,
  };

  // Show validation errors only
  if (isOperationalError && err.errors?.length) {
    response.errors = err.errors;
  }

  // Show stack only in development
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;