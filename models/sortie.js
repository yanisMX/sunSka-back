// models/sortie.js
import { DataTypes } from 'sequelize';
import sequelize from '../databaseConnexion.js';
import Stock from './stock.js';

const Sortie = sequelize.define('Sortie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idStock: {
    type: DataTypes.INTEGER,
    references: {
      model: Stock,
      key: 'id',
    },
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Sorties',
  timestamps: false,
});

Stock.hasMany(Sortie, { foreignKey: 'idStock' });

export default Sortie;
