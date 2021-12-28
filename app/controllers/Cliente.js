const Sequelize = require('sequelize');
const Cliente = require('../models/Cliente')
const Ponto = require('../models/Ponto')

module.exports = {
    async list(req, res){
        try {
            const clientes = await Cliente.findAll()
            return res.status(200).json(clientes);
        } catch (err) {
            return res.status(400).json(error);
        }
    },
    async show(req, res){
        try {
            const cliente = await Cliente.findAll({where: {id: req.params.id}});
            return res.status(200).json(cliente)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async create(req, res){
        const {nome, tipo} = req.body;
        try {
            const cliente = await Cliente.create({nome, tipo});
            return res.status(201).json(cliente)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async update(req, res){
        const Op = Sequelize.Op
        const {nome, tipo} = req.body;
        const id = req.params.id;
        try {
            await Cliente.update({nome, tipo}, {where: {id: {[Op.eq]: id }}});
            return res.status(204).json({msg: `Cliente ${id} atualizado com sucesso!`});
        } catch (error) {
            console.log(error)
            return res.status(400).json(error);            
        }
    },
    async delete(req, res){
        try {
            await Ponto.destroy( {where: { cliente_id: req.params.id } })
            await Cliente.destroy({where: {id: req.params.id }})
            return res.status(204).json({msg: `Exclusão de item de ID ${req.params.id} feita com sucesso!`})
        } catch (error) {
            console.error(error)
            return res.status(400).json(error);            
        }
    },
}