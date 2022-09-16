//models
const { Meal } = require("../models/meals.model");
const { Order } = require("../models/orders.model");
const { Restaurant } = require("../models/restaurants.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError.utils");

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id },
    include: {
      model: Meal,
      required: false,
      include: {
        model: Restaurant,
        require: false,
      },
    },
  });

  if (!order) {
    return next(new AppError("Order doesnt exist", 404));
  }

  req.order = order;
  next();
});

const orderStatusActive = (req, res, next) => {
  const { order } = req;

  if (order.status !== "active") {
    return next(new AppError("order status was completed or cancelled"));
  }

  next();
};

module.exports = { orderExist, orderStatusActive };
