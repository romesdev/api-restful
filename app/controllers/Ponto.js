const Sequelize = require('sequelize')
const Ponto = require('../models/Ponto');
const Cliente = require('../models/Cliente')
const Endereco = require('../models/Endereco')
const Contrato = require('../models/Contrato')
const viewPonto = require('../views/Ponto')

module.exports = {
    async list(req, res){
        const filter = req.query
        try {
            let pontos = ''
            if (filter != null) 
                pontos = await Ponto.findAll({ where: filter,
                include: [ {model: Cliente}, {model: Endereco} ]
                })

            else{ 
                pontos = await Ponto.findAll({
                include: [ {model: Cliente}, {model: Endereco} ]
                })
            }
            return res.status(200).json({dados: viewPonto.renderMany(pontos)})
        } catch (error) {
            return res.status(400).json({error: error})
        }
    },
    async show(req, res){
        try {
            const ponto = await Ponto.findAll({ where: {id: req.params.id},
                include: [ {model: Cliente}, {model: Endereco} ]
            })
            return res.status(200).json( viewPonto.render(ponto['0']) )
            
        } catch (error) {
            return res.status(400).json({mensagem: `Ponto ${req.params.id} não encontrado.`})
        }
    },
    async create(req, res){
        const {cliente_id, endereco_id} = req.body;
        try {
            const ponto = await Ponto.restore( { // tenta restaurar um registro deletado
                where: {cliente_id: cliente_id, endereco_id: endereco_id, 
                        data_remocao: {
                            [Sequelize.Op.not]: null
                        }
                    } 
                })
            
            if (ponto != 1){ // cria um novo registro
                let pontoNovo = await Ponto.create({cliente_id, endereco_id})
                return res.status(201).json(pontoNovo)
            }
            // retorna a atualizacao do registro
            return res.status(204).json(ponto)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async delete(req, res){
        let id = req.params.id       
        try {
            await Contrato.destroy( { where: { ponto_id: id} } )
            return res.status(204).json({mensagem: `Exclusão de item de ID ${req.params.id} feita com sucesso!`});
        } catch (err) {
            return res.status(400).json({mensagem:'Erro na exclusão'})
        }
    },
}