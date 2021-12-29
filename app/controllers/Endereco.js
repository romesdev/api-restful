const Sequelize = require('sequelize')
const Endereco = require('../models/Endereco')
const Ponto = require('../models/Ponto')

module.exports = {
    async list(req, res){
        const filter = req.query
        try {
            let enderecos = ''

            if (filter != null)
                enderecos = await Endereco.findAll( { where: filter } )
            else {
                enderecos = await Endereco.findAll()
            }
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
            const endereco = await Endereco.restore( { // tenta restaurar um registro deletado
                where: {logradouro: logradouro, bairro: bairro, numero: numero, 
                        data_remocao: {
                            [Sequelize.Op.not]: null
                        }} })
            
            if (endereco != 1){ // cria um novo registro
                let enderecoNovo = await Endereco.create({logradouro, bairro, numero})
                return res.status(201).json(enderecoNovo)
            }
            // retorna a atualizacao do registro
            return res.status(204).json(endereco)
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
        let id = req.params.id
        try {
            await Ponto.destroy( {where: { endereco_id: id } }) // desativando ponto que detem este registro
            await Endereco.destroy({where: {id: id }}) // desativando o registro
            return res.status(204).json({mensagem: `Exclusão de item de ID ${req.params.id} feita com sucesso!`})
        } catch (err) {
            return res.status(400).json({mensagem:'Erro na exclusão'})
        }
    },
}