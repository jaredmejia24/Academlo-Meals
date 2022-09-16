const express = require("express");

//controllers
const {
  createMeal,
  getAllMeals,
  getOneMeal,
  updateMeal,
  deleteMeal,
} = require("../controller/meals.controller");

//middlewares
//restaurant middlewares
const { restaurantExist } = require("../middlewares/restaurants.middlewares");

//meals middlewares
const { mealExist } = require("../middlewares/meals.middlewares");

//validators middlewares
const {
  createMealValidators,
} = require("../middlewares/validators.middlewares");

//authorization middlewares
const {
  protectSession,
  protectAdmin,
} = require("../middlewares/auth.middlewares");

const mealsRouter = express.Router();

mealsRouter.get("/", getAllMeals);

mealsRouter.get("/:id", mealExist, getOneMeal);

mealsRouter.use(protectSession);

mealsRouter.post("/:id", createMealValidators, restaurantExist, createMeal);

mealsRouter.patch(
  "/:id",
  createMealValidators,
  mealExist,
  protectAdmin,
  updateMeal
);

mealsRouter.delete("/:id", mealExist, protectAdmin, deleteMeal);

module.exports = { mealsRouter };
