const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');  
const Sistema = require('./Sistema'); // importe o modelo Sistema

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
    },
    sistema_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sistema', // nome da tabela referenciada
            key: 'id'
        }
    }
}, {
    tableName: 'plano',
    timestamps: false
});

// Associação: plano pertence a um sistema
Plano.belongsTo(Sistema, { foreignKey: 'sistema_id' });

module.exports = Plano;
