const { DataTypes, Model } = require("sequelize");
const sequelize = require("../index");

class Scholar extends Model {}
Scholar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    scholarName: {
      type: DataTypes.STRING,
    },
    scholarType: {
      type: DataTypes.STRING,
    },
    scholarBudgetName: {
      type: DataTypes.STRING,
    },
    budgetYear: {
      type: DataTypes.STRING,
    },
    tokens:{
        type: DataTypes.STRING,
    }
  },
  { sequelize, modelName: "scholar", timestamps: false, freezeTableName: true }
);
module.exports = Scholar;
