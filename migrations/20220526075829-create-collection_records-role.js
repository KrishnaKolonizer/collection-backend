'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // let modules = await queryInterface.sequelize.query(
    //   'SELECT * FROM modules name=\'Collection\'', {
    //     type: queryInterface.sequelize.QueryTypes.SELECT
    // });
    let features = await queryInterface.sequelize.query(
      'SELECT * FROM features WHERE name=\'Customers\'', {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });
    
    let roleCheck = await queryInterface.sequelize.query(
      'SELECT * FROM roles where name = \'SUPER ADMIN\' LIMIT 1', {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });

    if(roleCheck.length){
      let module_permission = {
        collection:1
      };

      await queryInterface.bulkUpdate('module__permissions', module_permission,{role_id:roleCheck[0].id});
      
      let feature_accesss_permission = [];

      feature_accesss_permission.push(
     {
        feature_id:features[0].id,
        role_id:roleCheck[0].id,
        created_at:Sequelize.literal('CURRENT_TIMESTAMP'),
        updated_at:Sequelize.literal('CURRENT_TIMESTAMP'),
        read:1,
        create:1,
        delete:1,
        update:1,
        full_access:1
    }
    );

      // console.log(feature_accesss_permission);
      await queryInterface.bulkInsert('feature__access__permissions', feature_accesss_permission);

    }
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.bulkDelete("module__permissions", {name: 'Customers'}, {
    //   truncate: true,
    //   cascade: true,
    // });
    let features = await queryInterface.sequelize.query(
      'SELECT * FROM features WHERE name=\'Customers\'', {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });
 
    await queryInterface.sequelize.query(
      'delete FROM feature__access__permissions WHERE id='+features[0].id, {
        type: queryInterface.sequelize.QueryTypes.DELETE
    });
  }
};
