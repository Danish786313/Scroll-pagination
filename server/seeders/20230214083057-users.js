'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const faker = require('faker');
    const users = [...Array(200)].map((user) => (
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        gender: faker.name.gender(),
        password: faker.internet.password(8),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ))
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});  
  }
};
