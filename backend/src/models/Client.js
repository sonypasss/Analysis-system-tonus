const {
  DataTypes
} = require("sequelize");

const sequelize = require("../config/database");

const Client = sequelize.define(
  "Client",

  {
    id: {
      type:
        DataTypes.INTEGER,

      autoIncrement:
        true,

      primaryKey:
        true
    },

    name: {
      type:
        DataTypes.STRING,

      allowNull:
        false
    },

    inn: {
      type:
        DataTypes.STRING,

      allowNull:
        false,

      unique:
        true
    },

    region: {
      type:
        DataTypes.STRING
    },

    segment: {
      type:
        DataTypes.STRING
    },

    phone: {
      type:
        DataTypes.STRING
    }
  },

  {
    tableName:
      "clients"
  }
);

module.exports = Client;