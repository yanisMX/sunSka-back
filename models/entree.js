// models/entree.js
import { DataTypes } from 'sequelize';
import sequelize from '../databaseConnexion.js';
import Stock from './stock.js';

const Entree = sequelize.define('Entree', {
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
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'Entrees',
  timestamps: false,
});

Stock.hasMany(Entree, { foreignKey: 'idStock' });

export default Entree;
