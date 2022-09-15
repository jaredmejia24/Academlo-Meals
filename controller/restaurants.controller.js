//models
const { Restaurant } = require("../models/restaurants.model");
const { Review } = require("../models/reviews.model");

//utils
const { catchAsync } = require("../utils/catchAsync");

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({ name, address, rating });

  res.status(201).json({
    status: "success",
    data: { newRestaurant },
  });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: "active" },
    include: { model: Review, where: { status: "active" }, required: false },
  });

  res.status(200).json({
    status: "success",
    data: { restaurants },
  });
});

const getOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: "success",
    data: { restaurant },
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  const updatedRestaurant = await restaurant.update({ name, address });

  res.status(200).json({
    status: "success",
    data: {
      updatedRestaurant,
    },
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: "disabled" });

  res.status(204).json({
    status: "success",
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { sessionUser, restaurantId } = req;

  const newReview = await Review.create({
    comment,
    rating,
    userId: sessionUser.id,
    restaurantId,
  });

  res.status(201).json({
    status: "success",
    data: {
      newReview,
    },
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  const updatedReview = await review.update({ comment, rating });

  res.status(200).json({
    status: "success",
    data: {
      updatedReview,
    },
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: "disabled" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
