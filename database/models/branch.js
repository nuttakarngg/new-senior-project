const { DataTypes, Model } = require("sequelize");
const sequelize = require("../index");

class Branch extends Model {}
Branch.init(
  {
    name_th: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name_en: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "branch", timestamps: false }
);
module.exports = Branch;
