'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('features', 
    [
    {
      name: 'Customers',
      created_at:Sequelize.literal('CURRENT_TIMESTAMP'),
      updated_at:Sequelize.literal('CURRENT_TIMESTAMP')
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.bulkDelete("features",  {name: 'Customers'}, {
      cascade: true,
    });
  }
};
