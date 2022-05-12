const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// creating model for user
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: Sequelize.STRING,
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

module.exports = User;
