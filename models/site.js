const { DataTypes } = require("sequelize");

// Import MySQL database connection
const sequelize = require("../util/database");

const Site = sequelize.define(
  "Site",
  {
    // Site Model attributes are defined here
    site_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    utc: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    internal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dst: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "Sites",
    timestamps: false,
  }
);

module.exports = Site;
