const Sequelize = require('sequelize')
const Historico = require('../models/Historico')

module.exports = {
    async list(req, res){
        try {
            const historicos = await Historico.findAll({
                order:[ ['data_criacao', 'ASC'] ]
            })
            return res.status(200).json({dados: historicos})
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
    // async update(req, res){
    //     const Op = Sequelize.Op
    //     const {logradouro, bairro, numero} = req.body;
    //     const id = req.params.id;
    //     try {
    //         const ponto = await Ponto.update({logradouro, bairro, numero}, {where: {id: {[Op.eq]: id }}})
    //         return res.status(204).json(ponto)
    //     } catch (error) {
    //         return res.status(400).json(error)         
    //     }
    // },
    async delete(req, res){
        try {
            await Historico.destroy({where: {id: req.params.id }});
            return res.status(204).json({mensagem: `Exclusão de item de ID ${req.params.id} feita com sucesso!`});
        } catch (err) {
            return res.status(400).json({mensagem:'Erro na exclusão'})
        }
    },
}