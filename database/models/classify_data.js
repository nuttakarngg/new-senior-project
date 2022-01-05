const { DataTypes, Model } = require("sequelize");
const sequelize = require("../index");

class ClassifyData extends Model {}
ClassifyData.init(
  {
    tokens: {
      type: DataTypes.STRING,
    },
    scholarTypes: {
      type: DataTypes.STRING,
    },
    label: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "classify_data", timestamps: false }
);
module.exports = ClassifyData;
