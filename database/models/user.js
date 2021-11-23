const { DataTypes, Model } = require("sequelize");
const sequelize = require("../index");
const Role = require("./role");
const user_role = require("./association/user_role");
const Branch = require("./branch");
const Research = require("./research");
const user_research = require("./association/user_research");
class User extends Model {}
User.init(
  {
    firstNameTH: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastNameTH: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstNameEN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastNameEN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "N",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ac_position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expertOf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, modelName: "user" }
);

User.Role = User.belongsToMany(Role, { through: user_role });
// Role.User = Role.belongsToMany(User, { through: user_role });
User.Research = User.belongsToMany(Research, { through: user_research });
User.Branch = User.belongsTo(Branch);
Research.User = Research.belongsTo(User, { foreignKey: "researcherId" });
module.exports = User;
