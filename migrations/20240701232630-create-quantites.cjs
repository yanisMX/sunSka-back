// migrations/20240701123600-create-quantites.js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Quantites", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idBoisson: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Boissons',
          key: 'id',
        },
      },
      idBar: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bars',
          key: 'id',
        },
      },
      quantite: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Quantites");
  },
};
