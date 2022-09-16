//models
const { Meal } = require("../models/meals.model");
const { Restaurant } = require("../models/restaurants.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError.utils");

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
    return next(new AppError("Meal doesnt exist", 404));
  }

  req.meal = meal;
  next();
});

module.exports = { mealExist };
