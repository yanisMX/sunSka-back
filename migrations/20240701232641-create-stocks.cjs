// migrations/20240701232639-create-stocks.js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Stocks", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idProduit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Produits',
          key: 'id',
        },
      },
      idBar: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Bars',
          key: 'id',
        },
      },
      quantite: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seuilAlerte: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Stocks");
  },
};
