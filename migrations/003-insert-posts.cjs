'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {

    const password = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('Posts', [
      {
        id: uuidv4(),
        title: 'Kuis Geografi',
        content: "Apa ibukota Indonesia?",
        username: 'Ani',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
