const express = require("express");

//controllers
const {
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/orders.controller");
const { getUserOrders } = require("../controller/users.controller");

//middlewares
const {
  orderExist,
  orderStatusActive,
} = require("../middlewares/order.middlewares");
//authorization
const {
  protectSession,
  protectUsersOrders,
} = require("../middlewares/auth.middlewares");

//validators
const {
  createOrderValidators,
} = require("../middlewares/validators.middlewares");

const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter.post("/", createOrderValidators, createOrder);

ordersRouter.get("/me", getUserOrders);

ordersRouter.patch(
  "/:id",
  orderExist,
  protectUsersOrders,
  orderStatusActive,
  updateOrder
);

ordersRouter.delete(
  "/:id",
  orderExist,
  protectUsersOrders,
  orderStatusActive,
  deleteOrder
);

module.exports = { ordersRouter };
