const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bingle_shop_platinum", "postgres", "postgres123", {
  host: "127.0.0.1",
  dialect: "postgres",
});

module.exports = sequelize;
