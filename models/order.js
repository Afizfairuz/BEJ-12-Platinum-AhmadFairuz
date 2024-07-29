const { Model, DataTypes } = require("sequelize");
const sequelize = require("../auth_backend/config/postgres");

class Order extends Model {
  static associate(models) {
    models.Order.hasMany(models.Payment, { foreignKey: "orderId" });
    models.Order.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    models.Order.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  }
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "Orders",
  }
);

module.exports = Order;
