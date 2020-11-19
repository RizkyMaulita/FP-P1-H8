'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelPackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TravelPackage.hasMany(models.Transaction)
      TravelPackage.belongsToMany(models.User, {through: models.Transaction})
    }
    getDate(){
      return new Date(this.departure_date).toDateString()
    }
  };
  TravelPackage.init({
    title: DataTypes.STRING,
    about: DataTypes.TEXT,
    location: DataTypes.STRING,
    meet_point: DataTypes.STRING,
    departure_date: DataTypes.DATEONLY,
    duration: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TravelPackage',
  });
  return TravelPackage;
};