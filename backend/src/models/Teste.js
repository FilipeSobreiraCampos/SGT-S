const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Plano = require('./Plano'); // Importando o modelo Plano

const Teste = sequelize.define('teste', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dataExecucao: {
        type: DataTypes.DATE,
        allowNull: true
    },
    resultado: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    plano_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'plano', // Nome da tabela referenciada
            key: 'id'
        }
    }
}, {
    tableName: 'teste',
    timestamps: false
});

// Associação: teste pertence a um plano
Teste.belongsTo(Plano, { foreignKey: 'plano_id' });

module.exports = Teste;
