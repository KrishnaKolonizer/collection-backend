'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('modules', 
    [
    {
      name: 'Collection',
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
     await queryInterface.bulkDelete("modules",  {name: 'Collection'}, {
      cascade: true,
    });
  }
};
