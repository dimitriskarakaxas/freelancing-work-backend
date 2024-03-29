const express = require("express");
const cors = require("cors");

// Import MySQL database connection
const sequelize = require("./util/database");

// Import DataBase Models
const Site = require("./models/site");
const Portfolio = require("./models/portfolio");

// Import Application's Routes
const applicationRoutes = require("./routes/app");

// Initializing express application
const app = express();

// Setting Application's PORT
const port = 8080;

app.use(cors());

app.use(express.json());

app.use("/", applicationRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// Setting Database Associations
Site.belongsTo(Portfolio, {
  foreignKey: {
    name: "portfolio_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
Portfolio.hasMany(Site, {
  foreignKey: {
    name: "portfolio_id",
    allowNull: false,
  },
});

// This creates the table if it doesn't exist (and does nothing if it already exists)
sequelize
  // The first time start the server with the above code to generate the tables in the database
  // .sync({ force: true })
  // After the first time remove the previous line and go with the above line(.sync())
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
      err
    )
  );
