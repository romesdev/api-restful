const Sequelize = require('sequelize');
const database = require('../../config/sequelize')

class Endereco extends Sequelize.Model { }

Endereco.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    logradouro: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: { len: [3, 128] }
    },
    bairro: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: { len: [3, 128] }
    },
    numero: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    data_criacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    data_atualizacao: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    },
    data_remocao: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    }
},
    {
        sequelize: database,
        modelName: 'endereco',
        tableName: 't_endereco',
        timestamps: true,
        paranoid: true,
        deletedAt: 'data_remocao',
        updatedAt: 'data_atualizacao',
        createdAt: 'data_criacao'
    }
)

database.sync()

module.exports = Endereco



