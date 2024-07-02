// models/quantite.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Quantite = sequelize.define('Quantite', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idBoisson: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Boisson',
        key: 'id',
      },
    },
    idBar: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bar',
        key: 'id',
      },
    },
    quantite: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'Quantites',
    timestamps: false,
  });

  Quantite.associate = (models) => {
    Quantite.belongsTo(models.Boisson, { foreignKey: 'idBoisson' });
    Quantite.belongsTo(models.Bar, { foreignKey: 'idBar' });
    Quantite.hasMany(models.Ventes, { foreignKey: 'idQuantite' });
    Quantite.hasMany(models.Livraison, { foreignKey: 'idQuantite' });
  };

  return Quantite;
};
