const {
  DataTypes
} = require("sequelize");

const sequelize = require("../config/database");

const Product = sequelize.define(
  "Product",

  {
    id: {
      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true
    },

    article: {
      type: DataTypes.STRING,

      allowNull: false,

      unique: true
    },

    name: {
      type: DataTypes.STRING,

      allowNull: false
    },

    productGroup: {
      type: DataTypes.STRING
    },

    imageUrl: {
      type: DataTypes.TEXT
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),

      allowNull: false
    },

    stockQuantity: {
      type: DataTypes.INTEGER,

      defaultValue: 0
    },

    reservedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },

  {
    tableName:
      "products"
  }
);

module.exports = Product;