//models
const { Review } = require("../models/reviews.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError.utils");

const reviewExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({ where: { id, status: "active" } });

  if (!review) {
    return next(new AppError("Review doesnt exist", 404));
  }

  req.review = review;
  next();
});

module.exports = { reviewExist };
