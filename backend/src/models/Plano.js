const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');  // Supondo que você tenha uma configuração do Sequelize

// Definindo o modelo Plano
const Plano = sequelize.define('plano', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dataInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataFim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    tipoTeste: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'plano',  // Nome da tabela no banco de dados
    timestamps: false    // Caso a tabela não tenha as colunas 'createdAt' e 'updatedAt'
});

module.exports = Plano;