const dotenv = require("dotenv");
const { AppError } = require("../utils/AppError.utils");

dotenv.config({ path: "./config.env" });

const sendErrorDev = (error, req, res) => {
  console.log(error);

  res.status(error.statusCode).json({
    error,
    stack: error.stack,
  });
};

const sendErrorProd = (error, req, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

const invalidTokenError = () => {
  return new AppError("Invalid session", 403);
};

const tokenExpiredError = () => {
  return new AppError("Session expired", 403);
};

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "fail";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let err = { ...error };

    if (error.name === "JsonWebTokenError") err = invalidTokenError();
    else if(error.name === "TokenExpiredError") err = tokenExpiredError();

    sendErrorProd(err, req, res);
  }
};

module.exports = { globalErrorHandler };
