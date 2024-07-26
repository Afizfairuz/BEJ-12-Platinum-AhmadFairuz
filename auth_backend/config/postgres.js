const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("auth_backend", "postgres", "171586", {
  host: "127.0.0.1",
  dialect: "postgres",
});

module.exports = sequelize;
