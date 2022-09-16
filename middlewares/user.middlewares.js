const { User } = require("../models/user.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError.utils");

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id, status: "active" } });

  if (!user) {
    return next(new AppError("User doesnt exist", 404));
  }

  req.user = user;
  next();
});

module.exports = { userExist };
