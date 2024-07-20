'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Promo.init({
    id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    promoImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Promo',
  });
  return Promo;
};