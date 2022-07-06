'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let module_features = await queryInterface.sequelize.query(
      `SELECT * FROM module__features where path='collection/customer'`, {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });
    let role = await queryInterface.sequelize.query(
      'SELECT * FROM roles where id = 1 and name = \'SUPER ADMIN\' LIMIT 1', {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });
    let role_module_features = [];

      role_module_features.push({
          role_id: role[0].id,
          module_feature_id : module_features[0].id,
          created_at:Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at:Sequelize.literal('CURRENT_TIMESTAMP'),
        });
    await queryInterface.bulkInsert('role_module_features', role_module_features);
  },

  async down (queryInterface, Sequelize) {

    let module_features = await queryInterface.sequelize.query(
      `SELECT * FROM module__features where path='collection/customer'`, {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });

    await queryInterface.sequelize.query(
      `delete FROM role_module_features WHERE module_feature_id =`+module_features[0].id, {
        type: queryInterface.sequelize.QueryTypes.DELETE
    });
    
  }
};
