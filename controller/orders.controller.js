//models
const { Meal } = require("../models/meals.model");
const { Order } = require("../models/orders.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError.utils");

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({ where: { id: mealId, status: "active" } });

  if (!meal) {
    return next(new AppError("meal doesnt exist", 400));
  }

  const totalPrice = Number(meal.price) * quantity;

  const newOrder = await Order.create({
    quantity,
    mealId,
    totalPrice,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: "success",
    data: {
      newOrder,
    },
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  const updatedOrder = await order.update({ status: "completed" });

  res.status(200).json({
    status: "success",
    data: {
      updatedOrder,
    },
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "cancelled" });

  res.status(204).json({ status: "success" });
});

module.exports = { createOrder, updateOrder, deleteOrder };
