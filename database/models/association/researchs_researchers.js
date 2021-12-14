const sequelize = require("../../index");
const { DataTypes } = require("sequelize");
const Researchs_Researchers = sequelize.define(
  "researchs_researchers",
  {
    researchId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    gtype: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);
module.exports = Researchs_Researchers;
