const { Error } = require("./utils/AppError.utils");

const express = require("express");

//import routers
const { usersRouter } = require("./routes/users.routes");
const { restaurantsRouter } = require("./routes/restaurants.routes");
const { mealsRouter } = require("./routes/meals.routes");
const { ordersRouter } = require("./routes/orders.routes");

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
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "fail";
  console.log(error);

  res.status(statusCode).json({
    status,
    message: error.message,
    statusCode: error.statusCode,
  });
});

// Catch non-existing endpoints
app.all("*", (req, res) => {
  const error = new Error(
    `${req.method} ${req.url} does not exists in our server`
  );
  res.status(404).json(error);
});

module.exports = { app };
