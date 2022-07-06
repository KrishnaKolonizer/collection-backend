'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cheques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Cleared', 'Bounced','Pending']
      },
      status_date: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.DECIMAL(10,2)
      },
      reason_for_bounce: {
        type: Sequelize.STRING
      },
      bounce_charge: {
        type: Sequelize.DECIMAL(10,2)
      },
      payment_id: {
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
    await queryInterface.dropTable('cheques');
  }
};