'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'module__permissions', 
        'collection', 
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('module__permissions', 'collection')
    ]);
  }
};
