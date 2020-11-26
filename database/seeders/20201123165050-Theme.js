'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Themes', [
      {
        date: '2020-10-23',
        readable_date: 'Mon 23rd Nov',
        medium: 'Instrumental',
        thing: 'Dog',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2020-10-24',
        readable_date: 'Tue 24th Nov',
        medium: 'Sculpture',
        thing: 'Fox',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: '2020-10-25',
        readable_date: 'Wed 25th Nov',
        medium: 'Sculpture',
        thing: 'Moors',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Themes', null, {});
  }
};
