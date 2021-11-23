const { DataTypes, Model } = require("sequelize");
const sequelize = require("../index");

class Role extends Model {}
Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, modelName: "role", timestamps: false }
);
module.exports = Role;
