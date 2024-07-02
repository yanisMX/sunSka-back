// models/boisson.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Boisson = sequelize.define('Boisson', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
    },
    quantiteLimite: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'Boissons',
    timestamps: false,
  });

  Boisson.associate = (models) => {
    Boisson.hasMany(models.Quantite, { foreignKey: 'idBoisson' });
  };

  return Boisson;
};
