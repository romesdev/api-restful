const Sequelize = require('sequelize')
const database = require('../../config/sequelize')

class Historico extends Sequelize.Model { }

Historico.init({
    id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
    contrato_id: {
            type: Sequelize.UUID,
            allowNull: false,
        },
    estado_anterior: {
            type: Sequelize.ENUM,
            values: ['Em vigor', 'Desativado Temporario', 'Cancelado'],
            allowNull: false
        },
    estado_posterior: {
            type: Sequelize.ENUM,
            values: ['Em vigor', 'Desativado Temporario', 'Cancelado'],
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
    },
    {
        sequelize: database,
        modelName: 'historico',
        tableName: 't_contrato_evento',
        timestamps: true,
        updatedAt: 'data_atualizacao',
        createdAt: 'data_criacao'
    }
)

database.sync()

module.exports = Historico
