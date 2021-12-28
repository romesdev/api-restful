const Sequelize = require('sequelize');
const database = require('../../config/sequelize')
const Cliente = require('../models/Cliente')
const Endereco = require('./Endereco')


class Ponto extends Sequelize.Model { }

Ponto.init({
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
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
        modelName: 'ponto',
        tableName: 't_ponto',
        timestamps: true,
        paranoid: true,
        deletedAt: 'data_remocao',
        updatedAt: 'data_atualizacao',
        createdAt: 'data_criacao'
    }
)

Ponto.belongsTo(Cliente, {
    foreignKey: 'cliente_id',
    onUpdate: 'cascade',
    onDelete: 'cascade',
    constraint: true
})

Ponto.belongsTo(Endereco, {
    foreignKey: 'endereco_id',
    onUpdate: 'cascade',
    onDelete: 'cascade',
    constraint: true
})

database.sync()

module.exports = Ponto



