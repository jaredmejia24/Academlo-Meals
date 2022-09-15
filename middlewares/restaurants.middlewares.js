//models
const { Restaurant } = require("../models/restaurants.model");
const { Review } = require("../models/reviews.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { Error } = require("../utils/error.class");

const restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id, status: "active" },
    include: { model: Review, where: { status: "active" }, required: false },
  });

  if (!restaurant) {
    const error = new Error("restaurant doesnt exist");
    return res.status(404).json(error);
  }

  req.restaurant = restaurant;
  next();
});

const restaurantIdExistReview = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id: restaurantId, status: "active" },
  });

  if (!restaurant) {
    const error = new Error("restaurant doesnt exist");
    return res.status(404).json(error);
  }

  req.restaurantId = restaurantId;
  next();
});

module.exports = { restaurantExist, restaurantIdExistReview };
