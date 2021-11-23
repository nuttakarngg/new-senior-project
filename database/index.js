const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mssql",
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    pool: {
      max: 5000,
      min: 0,
      acquire: 30000,
      // idle: 10000,
    },
    autoreconnect:true
  }
);

module.exports = sequelize;
