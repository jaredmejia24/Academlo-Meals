const express = require("express");

//import routers
const { usersRouter } = require("./routes/users.routes");
const { Error } = require("./utils/error.class");

//start server
const app = express();

//enable recieve json
app.use(express.json());

//define endpoints
app.use("/api/v1/users", usersRouter);

//catch global errors
app.use((error, req, res, next) => {
  console.log(error);
  const errorObject = new Error(error);
  return res.json({
    errorObject,
  });
});

// Catch non-existing endpoints
app.all("*", (req, res) => {
  const error = new Error(
    `${req.method} ${req.url} does not exists in our server`
  );
  res.status(404).json({
    error,
  });
});

module.exports = { app };
