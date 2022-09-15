const express = require("express");

//import controllers
const {
  createRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require("../controller/restaurants.controller");

//import middlewares
//authorization
const {
  protectSession,
  protectAdmin,
  protectReviewOwner,
} = require("../middlewares/auth.middlewares");

//restaurant middlewares
const {
  restaurantExist,
  restaurantIdExistReview,
} = require("../middlewares/restaurants.middlewares");

//review middlewares
const { reviewExist } = require("../middlewares/reviews.middlewares");

//validators
const {
  createRestaurantValidators,
  updateRestaurantValidators,
  createReviewValidators,
} = require("../middlewares/validators.middlewares");

const restaurantsRouter = express.Router();

restaurantsRouter.get("/", getAllRestaurants);

restaurantsRouter.get("/:id", restaurantExist, getOneRestaurant);

restaurantsRouter.use(protectSession);

restaurantsRouter.post("/", createRestaurantValidators, createRestaurant);

restaurantsRouter.patch(
  "/:id",
  updateRestaurantValidators,
  protectAdmin,
  restaurantExist,
  updateRestaurant
);

restaurantsRouter.delete(
  "/:id",
  protectAdmin,
  restaurantExist,
  deleteRestaurant
);

restaurantsRouter.post(
  "/reviews/:restaurantId",
  createReviewValidators,
  restaurantIdExistReview,
  createReview
);

restaurantsRouter.patch(
  "/reviews/:id",
  createReviewValidators,
  reviewExist,
  protectReviewOwner,
  updateReview
);

restaurantsRouter.delete(
  "/reviews/:id",
  reviewExist,
  protectReviewOwner,
  deleteReview
);

module.exports = { restaurantsRouter };
