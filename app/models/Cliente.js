const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');
const database = require('../../config/sequelize')

class Cliente extends Sequelize.Model { }

Cliente.init( {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: { len: [3, 128] },
            unique: true
        },
        tipo: {
            type: Sequelize.ENUM,
            values: ['jurídico', 'físico', 'especial'],
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
        },
    }, 
    { 
    sequelize: database,
    modelName: 'cliente',
    tableName: 't_cliente',
    timestamps: true,
    paranoid: true,
    deletedAt: 'data_remocao',
    updatedAt: 'data_atualizacao',
    createdAt: 'data_criacao'
})

database.sync()

module.exports = Cliente