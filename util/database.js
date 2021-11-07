const Sequelize = require("sequelize");

const database = "Sites-WebApp";
const username = "root";
const password = "triapoulakia123!";

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
