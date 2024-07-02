// models/bar.js
import { DataTypes } from 'sequelize';
import sequelize from '../databaseConnexion.js';

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

export default Bar;
