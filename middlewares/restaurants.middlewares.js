//models
const { Restaurant } = require("../models/restaurants.model");
const { Review } = require("../models/reviews.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError.utils");

const restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id, status: "active" },
    include: { model: Review, where: { status: "active" }, required: false },
  });

  if (!restaurant) {
    return next(new AppError("restaurant doesnt exist", 404));
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
    return next(new AppError("restaurant doesnt exist", 404));
  }

  req.restaurantId = restaurantId;
  next();
});

module.exports = { restaurantExist, restaurantIdExistReview };
