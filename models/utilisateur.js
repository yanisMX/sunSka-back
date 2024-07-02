// models/utilisateur.js
import { DataTypes } from 'sequelize';
import sequelize from '../databaseConnexion.js';
import Bar from './bar.js';

const Utilisateur = sequelize.define('Utilisateur', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passWd_hashed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permission: {
    type: DataTypes.STRING,
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
}, {
  tableName: 'Utilisateurs',
  timestamps: false,
});

Bar.hasMany(Utilisateur, { foreignKey: 'idBar' });

export default Utilisateur;
