const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError.utils");

dotenv.config({ path: "./config.env" });

const protectSession = catchAsync(async (req, res, next) => {
  // Get token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token
    // req.headers.authorization = 'Bearer token'
    token = req.headers.authorization.split(" ")[1];
  }

  // Check if the token was sent or not
  if (!token) {
    return next(new AppError("Invalid session", 403));
  }

  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Verify the token's owner
  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user) {
    return next(
      new AppError("The owner of the session is no longer active", 403)
    );
  }

  // Grant access
  req.sessionUser = user;
  next();
});

const protectUsersAccount = (req, res, next) => {
  const { sessionUser, user } = req;
  // const { id } = req.params;

  // If the users (ids) don't match, send an error, otherwise continue
  if (sessionUser.id !== user.id) {
    return next(new AppError("You are not the owner of this account", 403));
  }

  // If the ids match, grant access
  next();
};

const protectAdmin = (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== "admin") {
    return next(
      new AppError(
        "You do not have the enough authorization to continue this action",
        403
      )
    );
  }

  next();
};

const protectReviewOwner = (req, res, next) => {
  const { sessionUser, review } = req;

  if (sessionUser.id !== review.userId) {
    return next(new AppError("You are not the owner of this review", 403));
  }

  next();
};

const protectUsersOrders = (req, res, next) => {
  const { sessionUser, order } = req;

  if (sessionUser.id !== order.userId) {
    return next(new AppError("You are not the owner of this order", 403));
  }

  next();
};

module.exports = {
  protectSession,
  protectUsersAccount,
  protectAdmin,
  protectReviewOwner,
  protectUsersOrders,
};
