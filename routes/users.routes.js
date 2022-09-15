const express = require("express");

//import controllers
const {
  createUser,
  login,
  updateUser,
  deleteUser,
  getUserOrders,
  getOneUserOrder,
} = require("../controller/users.controller");

//import middlewares
//validations
const {
  loginValidations,
  signUpValidators,
  patchUserValidations,
} = require("../middlewares/validators.middlewares");

//user middlewares
const { userExist } = require("../middlewares/user.middlewares");

//order middlewares
const { orderExist } = require("../middlewares/order.middlewares");

//authorization
const {
  protectSession,
  protectUsersAccount,
} = require("../middlewares/auth.middlewares");

const usersRouter = express.Router();

usersRouter.post("/signup", signUpValidators, createUser);

usersRouter.post("/login", loginValidations, login);

usersRouter.use(protectSession);

usersRouter.patch(
  "/:id",
  patchUserValidations,
  userExist,
  protectUsersAccount,
  updateUser
);

usersRouter.delete("/:id", userExist, protectUsersAccount, deleteUser);

usersRouter.get("/orders", getUserOrders);

usersRouter.get("/orders/:id", orderExist, getOneUserOrder);

module.exports = { usersRouter };
