'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    afterDiscount(){
      if(this.total_person > 4) return this.transaction_total * 0.75
      else return this.transaction_total
    }
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
      Transaction.belongsTo(models.TravelPackage)
    }
  };
  Transaction.init({
    UserId: DataTypes.INTEGER,
    TravelPackageId: DataTypes.INTEGER,
    transaction_total: DataTypes.INTEGER,
    total_person: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};