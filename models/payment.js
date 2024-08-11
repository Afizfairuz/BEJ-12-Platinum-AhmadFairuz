const { Model, DataTypes } = require("sequelize");
const sequelize = require("../auth_backend/config/postgres");

class Payment extends Model {
  static associate(models) {
    models.Payment.belongsTo(models.Order, {
      foreignKey: "orderId",
      as: "order",
    });
  }
}
Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "Payments",
  }
);
module.exports = Payment;
