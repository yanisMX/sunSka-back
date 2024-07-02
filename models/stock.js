// models/stock.js
import { DataTypes } from 'sequelize';
import sequelize from '../databaseConnexion.js';
import Produit from './produit.js';
import Bar from './bar.js';

const Stock = sequelize.define('Stock', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idProduit: {
    type: DataTypes.INTEGER,
    references: {
      model: Produit,
      key: 'id',
    },
    allowNull: false,
  },
  idBar: {
    type: DataTypes.INTEGER,
    references: {
      model: Bar,
      key: 'id',
    },
    allowNull: false,
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seuilAlerte: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Stocks',
  timestamps: false,
});

Produit.hasMany(Stock, { foreignKey: 'idProduit' });
Bar.hasMany(Stock, { foreignKey: 'idBar' });

export default Stock;
