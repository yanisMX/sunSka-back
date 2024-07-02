// migrations/20240701123456-create-utilisateurs.js
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
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      permission: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      idBar: {
        type: Sequelize.INTEGER,
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
