const { body, validationResult } = require("express-validator");
const { Error } = require("../utils/error.class");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    const error = new Error(message);

    return res.status(400).json(error);
  }

  next();
};

const signUpValidators = [
  body("username")
    .notEmpty()
    .withMessage("username must not be empty")
    .isString()
    .withMessage("username must be a string")
    .isLength({ min: 2 })
    .withMessage("username must have at least 2 characters"),
  body("email")
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage("must provide a valid email")
    .isLength({ min: 6 })
    .withMessage("email must have at least 6 characters"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("role")
    .notEmpty()
    .withMessage("role must not be empty")
    .isString()
    .withMessage("role must be a string")
    .isLength({ min: 4 })
    .withMessage("role must have at least 4 characters"),
  checkValidations,
];

const loginValidations = [
  body("email")
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage("must provide a valid email")
    .isLength({ min: 6 })
    .withMessage("email must have at least 6 characters"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("invalid password"),
  checkValidations,
];

const patchUserValidations = [
  body("username")
    .notEmpty()
    .withMessage("username must not be empty")
    .isString()
    .withMessage("username must be a string")
    .isLength({ min: 2 })
    .withMessage("username must have at least 2 characters"),
  body("email")
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage("must provide a valid email")
    .isLength({ min: 6 })
    .withMessage("email must have at least 6 characters"),
  checkValidations,
];

const createRestaurantValidators = [
  body("name")
    .notEmpty()
    .withMessage("name must no be empty")
    .isString()
    .withMessage("name must be a string"),
  body("address")
    .notEmpty()
    .withMessage("address must no be empty")
    .isString()
    .withMessage("address must be a string"),
  body("rating")
    .notEmpty()
    .withMessage("rating must no be empty")
    .isNumeric("")
    .withMessage("rating must be a number"),
  checkValidations,
];

const updateRestaurantValidators = [
  body("name")
    .notEmpty()
    .withMessage("name must no be empty")
    .isString()
    .withMessage("name must be a string"),
  body("address")
    .notEmpty()
    .withMessage("address must no be empty")
    .isString()
    .withMessage("address must be a string"),
  checkValidations,
];

const createReviewValidators = [
  body("comment")
    .notEmpty()
    .withMessage("comment must not be empty")
    .isString()
    .withMessage("must be a string"),
  body("rating")
    .notEmpty()
    .withMessage("rating must no be empty")
    .isNumeric("")
    .withMessage("rating must be a number"),
  checkValidations,
];

module.exports = {
  signUpValidators,
  loginValidations,
  patchUserValidations,
  createRestaurantValidators,
  updateRestaurantValidators,
  createReviewValidators,
};
