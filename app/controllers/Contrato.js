const Sequelize = require('sequelize')
const Ponto = require('../models/Ponto')
const Cliente = require('../models/Cliente')
const Endereco = require('../models/Endereco')
const Contrato = require('../models/Contrato')
const Historico = require('../models/Historico')

module.exports = {
    async list(req, res){
        try {
            const contratos = await Contrato.findAll({
                include: [ 
                    { model: Ponto }
                ]
            })
            return res.status(200).json({dados: contratos})
        } catch (error) {
            return res.status(400).json({error: error})
        }
    },
    async show(req, res){
        try {
            const contrato = await Contrato.findAll({where: {id: req.params.id}, include: [ { model: Ponto } ]})
            return res.status(200).json(contrato)
        } catch (error) {
            return res.status(400).json({mensagem: `Contrato ${id} não encontrado.`}, error)
        }
    },
    async create(req, res){
        const { ponto_id } = req.body;
        try {
            const contrato = await Contrato.create({ponto_id})
            return res.status(201).json(contrato)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async delete(req, res){
        //let estado = Contrato.findAll( {where: {id: req.params.id}} )
        const id = req.params.id
        try {
            
            await Historico.create({contrato_id: id, estado_posterior: 'Desativado Temporario', estado_anterior: 'Em vigor'})
            await Contrato.destroy( {where: {id: id } })
            return res.status(204).json({mensagem: `Exclusão de item de ID ${req.params.id} feita com sucesso!`});
        } catch (err) {
            return res.status(400).json({mensagem:'Erro na exclusão'})
        }
    },
}