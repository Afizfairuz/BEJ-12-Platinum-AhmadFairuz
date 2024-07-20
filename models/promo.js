const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/postgres");

class Promo extends Model {
  static associate(models) {
    // Define associations here if needed
  }
}

Promo.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    },
    promoImage: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: "Promo",
    tableName: "Promos"
  }
);

module.exports = Promo