const { User } = require("../models/user.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { Error } = require("../utils/error.class");

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    const error = new Error("User doesnt exist");
    return res.status(404).json({ error });
  }

  req.user = user;
  next();
});

module.exports = { userExist };
