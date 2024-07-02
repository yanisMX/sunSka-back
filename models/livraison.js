// models/livraison.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Livraison = sequelize.define('Livraison', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idQuantite: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Quantite',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
    },
    quantite: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Livraisons',
    timestamps: false,
  });

  Livraison.associate = (models) => {
    Livraison.belongsTo(models.Quantite, { foreignKey: 'idQuantite' });
  };

  return Livraison;
};
