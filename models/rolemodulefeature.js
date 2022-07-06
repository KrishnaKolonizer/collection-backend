'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleModuleFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      this.belongsTo(models.Role, {foreignKey: 'role_id'});
      this.belongsTo(models.Module_Feature, {foreignKey: 'module_feature_id'});
    }
  }
  RoleModuleFeature.init({
    role_id: DataTypes.INTEGER,
    module_feature_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoleModuleFeature',
    underscored: true
  });
  return RoleModuleFeature;
};