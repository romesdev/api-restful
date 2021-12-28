const Sequelize = require('sequelize');
const Endereco = require('../models/Endereco');



module.exports = {
    async list(req, res){
        try {
            const enderecos = await Endereco.findAll()
            return res.status(200).json({dados: enderecos})
        } catch (error) {
            return res.status(400).json({error: error})
        }
    },
    async show(req, res){
        try {
            const endereco = await Endereco.findAll({where: {id: req.params.id}})
            return res.status(200).json(endereco)
        } catch (error) {
            return res.status(400).json({mensagem: `Endereço ${id} não encotrado.`}, error)
        }
    },
    async create(req, res){
        const {logradouro, bairro, numero} = req.body;
        try {
            const endereco = await Endereco.create({logradouro, bairro, numero})
            return res.status(201).json(endereco)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async update(req, res){
        const Op = Sequelize.Op
        const {logradouro, bairro, numero} = req.body;
        const id = req.params.id;
        try {
            const endereco = await Endereco.update({logradouro, bairro, numero}, {where: {id: {[Op.eq]: id }}})
            return res.status(204).json(endereco)
        } catch (error) {
            return res.status(400).json(error)         
        }
    },
    async delete(req, res){
        try {
            await Endereco.destroy({where: {id: req.params.id }});
            return res.status(204).json({mensagem: `Exclusão de item de ID ${req.params.id} feita com sucesso!`});
        } catch (err) {
            return res.status(400).json({mensagem:'Erro na exclusão'})
        }
    },
}