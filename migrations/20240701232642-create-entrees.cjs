// migrations/20240701232640-create-entrees.js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Entrees", {
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
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantite: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Entrees");
  },
};
