const Sequelize = require('sequelize')
const configDatabase = require('./db')

const sequelize = new Sequelize(configDatabase)

module.exports = sequelize