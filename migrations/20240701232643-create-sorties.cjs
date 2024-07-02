// migrations/20240701232641-create-sorties.js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sorties", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Stocks',
          key: 'id',
        },
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      quantite: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Sorties");
  },
};
