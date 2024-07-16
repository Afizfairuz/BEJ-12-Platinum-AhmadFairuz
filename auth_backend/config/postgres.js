const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("auth_backend", "postgres", "afizfairuz87", {
  host: "127.0.0.1",
  dialect: "postgres",
});

module.exports = sequelize;
