// migrations/20240701123630-create-livraisons.js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Livraisons", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idQuantite: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Quantites',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.STRING,
      },
      quantite: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Livraisons");
  },
};
