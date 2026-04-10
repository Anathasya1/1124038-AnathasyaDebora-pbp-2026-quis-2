'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {

    const password = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('Comments', [
      {
        id: uuidv4(),
        postId: "c0d55c53-6e6a-430d-b634-f1d23fd539fc",
        username: 'Budi',
        content: "Jawabannya Jakarta!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
