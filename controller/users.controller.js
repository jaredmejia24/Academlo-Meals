//models
const { User } = require("../models/user.model");
const { Order } = require("../models/orders.model");
const { Restaurant } = require("../models/restaurants.model");
const { Meal } = require("../models/meals.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError.utils");

dotenv.config({ path: "./config.env" });

const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (role !== "admin" && role !== "normal") {
    return next(new AppError("Invalid role", 400));
  }

  const user = await User.findOne({ where: { email } });

  //validate if user already exist
  if (user) {
    return next(new AppError("User already exist", 409));
  }
  // Encrypt the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name: username,
    email,
    password: hashedPassword,
    role,
  });

  // Remove password from response
  newUser.password = undefined;

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const login = catchAsync(async (req, res, next) => {
  // Get email and password from req.body
  const { email, password } = req.body;

  // Validate if the user exist with given email
  const user = await User.findOne({
    where: { email, status: "active" },
  });

  // Compare passwords (entered password vs db password)
  // If user doesn't exists or passwords doesn't match, send error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Wrong credentials", 400));
  }

  // Remove password from response
  user.password = undefined;

  // Generate JWT (payload, secretOrPrivateKey, options)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { username, email } = req.body;
  const { user } = req;

  await user.update({ name: username, email });

  //hide password
  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "disabled" });

  res.status(204).json({ status: "success" });
});

const getUserOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId: sessionUser.id },
    include: {
      model: Meal,
      required: false,
      include: {
        model: Restaurant,
        require: false,
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

const getOneUserOrder = catchAsync(async (req, res, next) => {
  const { sessionUser, order } = req;

  if (order.userId !== sessionUser.id) {
    return next(new AppError("Wrong credentials", 403));
  }

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

module.exports = {
  createUser,
  login,
  updateUser,
  deleteUser,
  getUserOrders,
  getOneUserOrder,
};
