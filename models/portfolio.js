const { DataTypes } = require("sequelize");

// Import MySQL database connection
const sequelize = require("../util/database");

const Portfolio = sequelize.define(
  "Portfolio",
  {
    // Portfolio Model attributes are defined here
    portfolio_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    portfolioName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      default: "Me",
    },
  },
  {
    tableName: "Portfolios",
    timestamps: false,
  }
);

module.exports = Portfolio;
