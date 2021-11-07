const express = require("express");
const cors = require("cors");

// Import MySQL database connection
const sequelize = require("./util/database");

const Site = require("./models/site");

// Import Application's Routes
const applicationRoutes = require("./routes/app");

// Initializing express application
const app = express();

// Setting Application's PORT
const port = 8080;

app.use(cors());

app.use(express.json());

app.use("/", applicationRoutes);

// This creates the table if it doesn't exist (and does nothing if it already exists)
sequelize
  .sync()
  .then((syncResult) => {
    // Models Synchronized => Starting the server
    app.listen(port, () => {
      console.log(`The app listening at http://localhost:${port}`);
    });
  })
  .catch((err) =>
    console.log(
      "An error occured while trying to connect in the database and sync the models.",
      error
    )
  );
