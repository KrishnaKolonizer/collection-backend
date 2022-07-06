'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment__histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      received_amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      received_amount_date: {
        type: Sequelize.DATE
      },
      payment_id: {
        type: Sequelize.INTEGER
      },
      payment_via_id: {
        type: Sequelize.INTEGER
      },
      remark: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      cheque_id: {
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
    await queryInterface.dropTable('payment__histories');
  }
};