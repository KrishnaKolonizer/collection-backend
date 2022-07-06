'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      receiving_amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      receiving_amount_date: {
        type: Sequelize.DATE
      },
      received_amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      received_amount_date: {
        type: Sequelize.DATE
      },
      remaining_amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      payment_via_id: {
        type: Sequelize.INTEGER
      },
      penalty_amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Pending', 'Success']
      },
      customer_property_id: {
        type: Sequelize.INTEGER
      },
      transaction_id: {
        type: Sequelize.STRING
      },
      
      task_name: {
        type: Sequelize.STRING
      },
      task_end_date: {
        type: Sequelize.DATE
      },
      is_complete: {
        type: Sequelize.BOOLEAN
      },
      remark: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payments');
  }
};