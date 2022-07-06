'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let modules = await queryInterface.sequelize.query(
      'SELECT * FROM modules ', {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });
    let features = await queryInterface.sequelize.query(
      'SELECT * FROM features ', {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });
    let insertArray = [];
    for (let index = 0; index < features.length; index++) {
       if(features[index].id >= 12){
            insertArray.push({
              module_id:modules[2].id,
              feature_id:features[index].id,
              path: modules[2].name.toLowerCase()+'/'+features[index].name.toLowerCase().replace(/ /g,"_").slice(0, -1),
              created_at:Sequelize.literal('CURRENT_TIMESTAMP'),
              updated_at:Sequelize.literal('CURRENT_TIMESTAMP')
            })
        }
    }

    await queryInterface.bulkInsert('module__features', insertArray);
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(
      `delete FROM module__features where path='collection/customer'`, {
        type: queryInterface.sequelize.QueryTypes.DELETE
    });
  }
};
