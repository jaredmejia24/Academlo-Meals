const { Meal } = require("./meals.model");
const { Order } = require("./orders.model");
const { Restaurant } = require("./restaurants.model");
const { Review } = require("./reviews.model");
const { User } = require("./user.model");

const initModels = () => {
  //restaurants has many meals
  Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
  Meal.belongsTo(Restaurant);

  //one to one meals <---> order
  Meal.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meal);

  //users has many orders
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  //users has many reviews
  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);

  //restaurants has many revies
  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant);
};

module.exports = { initModels };
