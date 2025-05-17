const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js'); // ajuste o caminho conforme seu projeto

const Sistema = sequelize.define('sistema', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    versao: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'sistema', // nome exato da tabela no banco de dados
    timestamps: false     // desativa createdAt e updatedAt
});

module.exports = Sistema;
