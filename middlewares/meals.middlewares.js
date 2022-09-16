//models
const { Meal } = require("../models/meals.model");
const { Restaurant } = require("../models/restaurants.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { Error } = require("../utils/error.class");

const mealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: { id, status: "active" },
    include: {
      model: Restaurant,
      where: { status: "active" },
      required: false,
    },
  });

  if (!meal) {
    const error = new Error("Meal doesnt exist");
    return res.status(404).json(error);
  }

  req.meal = meal;
  next();
});

module.exports = { mealExist };
