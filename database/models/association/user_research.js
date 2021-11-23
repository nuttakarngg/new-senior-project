const sequelize = require("../../index");
const user_research = sequelize.define("user_research", {}, { timestamps: false });
module.exports = user_research;
