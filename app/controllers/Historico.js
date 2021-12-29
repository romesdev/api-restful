const Sequelize = require('sequelize')
const Historico = require('../models/Historico')
const viewHistorico = require('../views/Historico')

module.exports = {
    async list(req, res){
        let id = req.params.id
        try {
            const historicos = await Historico.findAll({ 
                where: {contrato_id: id}, 
                order:[ ['data_criacao', 'ASC'] ]
            })
            return res.status(200).json({dados: viewHistorico.renderMany(historicos) })
        } catch (error) {
            return res.status(400).json({error: error})
        }
    },
    async show(req, res){
        try {
            const historico = await Historico.findAll({where: {id: req.params.id}})
            return res.status(200).json(historico)
        } catch (error) {
            return res.status(400).json({mensagem: `Historico ${id} não encontrado.`}, error)
        }
    },
    async create(req, res){
        const {estado_novo, estado_antigo} = req.body;
        try {
            const historico = await Historico.create({estado_novo, estado_antigo})
            return res.status(201).json(historico)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async delete(req, res){
        try {
            await Historico.destroy({where: {id: req.params.id }});
            return res.status(204).json({mensagem: `Exclusão de item de ID ${req.params.id} feita com sucesso!`});
        } catch (err) {
            return res.status(400).json({mensagem:'Erro na exclusão'})
        }
    },
}