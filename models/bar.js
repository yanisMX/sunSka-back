// models/bar.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Bar = sequelize.define('Bar', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Bars',
    timestamps: false,
  });

  Bar.associate = (models) => {
    Bar.hasMany(models.Utilisateur, { foreignKey: 'idBar' });
    Bar.hasMany(models.Quantite, { foreignKey: 'idBar' });
  };

  return Bar;
};
