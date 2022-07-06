'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   let payment_via=[];
     payment_via.push({
      name: 'Cash',
      description :'To make Payments',
      created_at:Sequelize.literal('CURRENT_TIMESTAMP'),
      updated_at:Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      name: 'Cheque',
      description :'To make Payments Via Cheque Method.',
      created_at:Sequelize.literal('CURRENT_TIMESTAMP'),
      updated_at:Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      name: 'Online_Payment',
      description :'To make Payment Using Online Payments',
      created_at:Sequelize.literal('CURRENT_TIMESTAMP'),
      updated_at:Sequelize.literal('CURRENT_TIMESTAMP'),
    });
await queryInterface.bulkInsert('payment__via', payment_via);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("payment__via",NULL, {
      cascade: true,
    });
  }
};
