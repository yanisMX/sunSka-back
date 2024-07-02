// models/utilisateur.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Utilisateur = sequelize.define('Utilisateur', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', 
    },
    idBar: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bars', 
        key: 'id',
      },
    },
  }, {
    tableName: 'Utilisateurs',
    timestamps: false,
  });

  Utilisateur.associate = (models) => {
    Utilisateur.belongsTo(models.Bar, { foreignKey: 'idBar' });
  };

  return Utilisateur;
};
