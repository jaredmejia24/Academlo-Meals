const { Error } = require("./utils/AppError.utils");

const express = require("express");

//import routers
const { usersRouter } = require("./routes/users.routes");
const { restaurantsRouter } = require("./routes/restaurants.routes");
const { mealsRouter } = require("./routes/meals.routes");
const { ordersRouter } = require("./routes/orders.routes");

//import error controller
const { globalErrorHandler } = require("./controller/error.controller");

//start server
const app = express();

//enable recieve json
app.use(express.json());

//define endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/restaurants", restaurantsRouter);
app.use("/api/v1/meals", mealsRouter);
app.use("/api/v1/orders", ordersRouter);

//catch global errors
app.use(globalErrorHandler);

// Catch non-existing endpoints
app.all("*", (req, res) => {
  const error = new Error(
    `${req.method} ${req.url} does not exists in our server`
  );
  res.status(404).json(error);
});

module.exports = { app };
