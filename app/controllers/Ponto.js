const Sequelize = require('sequelize')
const Ponto = require('../models/Ponto');
const Cliente = require('../models/Cliente')
const Endereco = require('../models/Endereco')

module.exports = {
    async list(req, res){
        try {
            const pontos = await Ponto.findAll({
                include: [ {model: Cliente}, {model: Endereco} ]
                })
            return res.status(200).json({dados: pontos})
        } catch (error) {
            return res.status(400).json({error: error})
        }
    },
    async show(req, res){
        try {
            const ponto = await Ponto.findAll({where: {id: req.params.id}})
            return res.status(200).json(ponto)
        } catch (error) {
            return res.status(400).json({mensagem: `Ponto ${id} não encontrado.`}, error)
        }
    },
    async create(req, res){
        const {cliente_id, endereco_id} = req.body;
        try {
            const ponto = await Ponto.create({cliente_id, endereco_id}, {
                include: [ {model: Cliente}, {model: Endereco} ]})
            return res.status(201).json(ponto)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async update(req, res){
        const Op = Sequelize.Op
        const {logradouro, bairro, numero} = req.body;
        const id = req.params.id;
        try {
            const ponto = await Ponto.update({logradouro, bairro, numero}, {where: {id: {[Op.eq]: id }}})
            return res.status(204).json(ponto)
        } catch (error) {
            return res.status(400).json(error)         
        }
    },
    async delete(req, res){
        try {
            await Ponto.destroy({where: {id: req.params.id }});
            return res.status(204).json({mensagem: `Exclusão de item de ID ${req.params.id} feita com sucesso!`});
        } catch (err) {
            return res.status(400).json({mensagem:'Erro na exclusão'})
        }
    },
}