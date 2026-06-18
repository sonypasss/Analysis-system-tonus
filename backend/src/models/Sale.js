const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Sale = sequelize.define(
  "Sale",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    saleDate: {
      type: DataTypes.DATE,
      allowNull: false
    },

    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    tableName: "sales"
  }
);

module.exports = Sale;