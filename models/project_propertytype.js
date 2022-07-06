'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_PropertyType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Project, {foreignKey: 'project_id'});
      this.belongsTo(models.PropertyType, {foreignKey: 'property_type_id'});
    }
  };
  Project_PropertyType.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,      
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    property_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,     
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,     
      
    },
    unit_area: {
      type: DataTypes.INTEGER,
      allowNull: true,     
    },
    area_length: {
      type: DataTypes.INTEGER,
      allowNull: true,     
    },
    area_breadth: {
      type: DataTypes.INTEGER,
      allowNull: true,     
    },
    total_area: {
      type: DataTypes.INTEGER,
      allowNull: true,     
    },
    area_type: {
      type: DataTypes.ENUM,
      values: ['Saleable', 'Non-Saleable'],
      allowNull: false,     
    },
  }, {
    sequelize,
    modelName: 'Project_PropertyType',
    underscored: true
  });
  return Project_PropertyType;
};