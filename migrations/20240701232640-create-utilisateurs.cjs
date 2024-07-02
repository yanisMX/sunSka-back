// migrations/20240701232643-create-utilisateurs.js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Utilisateurs", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      passWd_hashed: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      permission: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idBar: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Bars',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Utilisateurs");
  },
};
