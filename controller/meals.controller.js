//models
const { Meal } = require("../models/meals.model");
const { Restaurant } = require("../models/restaurants.model");

//utils
const { catchAsync } = require("../utils/catchAsync");

const createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id: restaurantId } = req.params;

  const newMeal = await Meal.create({ name, price, restaurantId });

  res.status(201).json({
    status: "success",
    data: {
      newMeal,
    },
  });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: { status: "active" },
    include: {
      model: Restaurant,
      where: { status: "active" },
      required: false,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      meals,
    },
  });
});

const getOneMeal = (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: "success",
    data: {
      meal,
    },
  });
};

const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  const updatedMeal = await meal.update({ name, price });

  res.status(200).json({
    status: "success",
    data: {
      updatedMeal,
    },
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: "disabled" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  createMeal,
  getAllMeals,
  getOneMeal,
  updateMeal,
  deleteMeal,
};
