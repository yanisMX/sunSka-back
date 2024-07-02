import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Ventes = sequelize.define('Ventes', {
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
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    quantite: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'Ventes',
    timestamps: false,
  });

  Ventes.associate = (models) => {
    Ventes.belongsTo(models.Quantite, { foreignKey: 'idQuantite' });
  };

  return Ventes;
};
