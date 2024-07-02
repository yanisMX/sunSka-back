// models/produit.js
import { DataTypes } from 'sequelize';
import sequelize from '../databaseConnexion.js';

const Produit = sequelize.define('Produit', {
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
  tableName: 'Produits',
  timestamps: false,
});

export default Produit;
