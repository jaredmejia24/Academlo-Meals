//models
const { Review } = require("../models/reviews.model");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { Error } = require("../utils/error.class");

const reviewExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({ where: { id, status: "active" } });

  if (!review) {
    const error = new Error("Review doesnt exist");
    return res.status(404).json(error);
  }

  req.review = review;
  next();
});

module.exports = { reviewExist };
