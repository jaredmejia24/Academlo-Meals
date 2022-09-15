//models
const { Meal } = require("../models/meals.model");
const { Order } = require("../models/orders.model");
const { Restaurant } = require("../models/restaurants.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { Error } = require("../utils/error.class");

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id },
    include: {
      model: Meal,
      required: false,
      where: { status: "active" },
      include: {
        model: Restaurant,
        where: { status: "active" },
        require: false,
      },
    },
  });

  if (!order) {
    const error = new Error("Order doesnt exist");
    return res.status(404).json(error);
  }

  req.order = order;
  next();
});

module.exports = { orderExist };
