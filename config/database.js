const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres@localhost:5432/dat/recrutamento', 'postgres', 'pg123',
                        {
                            dialect: 'postgres',
                            define: { 
                                timestamps: false,
                                underscored: true
                            }
                        });
 
module.exports = sequelize;