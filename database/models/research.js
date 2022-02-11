const { DataTypes, Model } = require("sequelize");
const sequelize = require("../index");
const Researchs_Researchers = require("./association/researchs_researchers");
const User = require("./user");
class Research extends Model {}
Research.init(
  {
    researchId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    researchNameTH: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    researchNameEN: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    researchResult: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    researchBudgetType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    researchScholarOwner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    researchScholarName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    researchBudget: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    researchBudgetResearcher: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    researchBudgetAssResearcher: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    researchBudgetETC: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    researchBudgetYear: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    researchStartDate: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    researchEnddate: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    researchType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    researchContractDateSign: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    researchStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    researchJoinCompany: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "research" }
);
Research.Research_User = Research.belongsToMany(User, { through: Researchs_Researchers,foreignKey:'researchId' });
Research.User_Research = User.belongsToMany(Research, { through: Researchs_Researchers,foreignKey:'userId' });

module.exports = Research;
