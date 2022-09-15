const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { Error } = require("../utils/error.class");

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
    const error = new Error("Invalid session");
    return res.status(403).json({
      error,
    });
  }

  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Verify the token's owner
  const user = await User.findOne({
    where: { id: decoded.id, status: "active" },
  });

  if (!user) {
    const error = new Error("The owner of the session is no longer active");
    return res.status(403).json({
      error,
    });
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
    const error = new Error("You are not the owner of this account");
    return res.status(403).json({ error });
  }

  // If the ids match, grant access
  next();
};

module.exports = { protectSession, protectUsersAccount };
