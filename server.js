const { app } = require("./app");
const { initModels } = require("./models/initModels");
const { db } = require("./utils/database.utils");

const startServer = async () => {
  try {
    await db.authenticate();

    //establish relations
    initModels();

    await db.sync();

    // Set server to listen
    const PORT = 4000;

    app.listen(PORT, () => {
      console.log("Express app running!");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
