const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const CartItems = sequelize.define("cart_items", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartItems;
