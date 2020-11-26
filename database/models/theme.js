'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate(models) {

    }
  };
  Theme.init({
    date: DataTypes.STRING,
    readable_date: DataTypes.STRING,
    medium: DataTypes.STRING,
    thing: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Theme',
  });
  return Theme;
};
