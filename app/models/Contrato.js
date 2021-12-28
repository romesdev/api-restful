const Sequelize = require('sequelize');
const database = require('../../config/sequelize')
const Ponto = require('./Ponto')


class Contrato extends Sequelize.Model { }

Contrato.init({
    id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        estado: {
            type: Sequelize.ENUM,
            values: ['Em vigor', 'Desativado Temporario', 'Cancelado'],
            defaultValue: 'Em vigor',
            allowNull: false
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
        modelName: 'contrato',
        tableName: 't_contrato',
        timestamps: true,
        paranoid: true,
        deletedAt: 'data_remocao',
        updatedAt: 'data_atualizacao',
        createdAt: 'data_criacao'
    }
)

Contrato.belongsTo(Ponto, {
    foreignKey: 'ponto_id',
    constraint: true,
})

database.sync()

module.exports = Contrato



