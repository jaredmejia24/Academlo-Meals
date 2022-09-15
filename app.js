const { Error } = require("./utils/error.class");

const express = require("express");

//import routers
const { usersRouter } = require("./routes/users.routes");
const { restaurantsRouter } = require("./routes/restaurants.routes");

//start server
const app = express();

//enable recieve json
app.use(express.json());

//define endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/restaurants", restaurantsRouter);

//catch global errors
app.use((error, req, res, next) => {
  console.log(error);
  const errorObject = new Error(error);
  return res.status(400).json(errorObject);
});

// Catch non-existing endpoints
app.all("*", (req, res) => {
  const error = new Error(
    `${req.method} ${req.url} does not exists in our server`
  );
  res.status(404).json(error);
});

module.exports = { app };
