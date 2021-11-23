const sequelize = require("../../index");
const user_role = sequelize.define("user_role", {}, { timestamps: false });
module.exports = user_role;
