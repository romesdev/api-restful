const Sequelize = require('sequelize')
const Ponto = require('../models/Ponto')
const Cliente = require('../models/Cliente')
const Endereco = require('../models/Endereco')
const Contrato = require('../models/Contrato')
const Historico = require('../models/Historico')
const viewContrato = require('../views/Contrato')

module.exports = {
    async list(req, res){
        try {
            const contratos = await Contrato.findAll({
                include: [{ 
                        model: Ponto,
                        include: [
                            {model: Cliente}, {model: Endereco}
                        ]
                    }
                ]
            })
            return res.status(200).json({dados: viewContrato.renderMany(contratos) })
        } catch (error) {
            return res.status(400).json({error: error})
        }
    },
    async show(req, res){
        try {
            const contrato = await Contrato.findAll({where: {id: req.params.id}, 
                include: [{ 
                model: Ponto,
                include: [
                    {model: Cliente}, {model: Endereco}
                ]
            }
        ]
    })
            return res.status(200).json(viewContrato.render(contrato['0']))
        } catch (error) {
            return res.status(400).json({"mensagem": `Contrato ${req.params.id} não encontrado.`})
        }
    },
    async create(req, res){
        const { ponto_id } = req.body;
        try {
            const contrato = await Contrato.restore( { // tenta restaurar um registro deletado
                where: {ponto_id: ponto_id, 
                        data_remocao: {
                            [Sequelize.Op.not]: null
                        }
                    } 
                })
            
            if (contrato != 1){ // cria um novo registro
                let contratoNovo = await Contrato.create({ ponto_id })
                return res.status(201).json(contratoNovo)
            }
            // retorna a atualizacao do registro
            return res.status(204).json(contrato)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async update(req, res) {
        const Op = Sequelize.Op
        const id = req.params.id
        const estado = req.body.estado
        try{
            const contrato = await Contrato.findAll({ where: { id: id} , atributes: ['estado'] })
            const estadoAntigo = contrato['0'].estado
            if (estado == "Desativado Temporario" && estadoAntigo == "Em vigor"){
                const contratoAtual = await Contrato.update( 
                                        {estado: estado},
                                        {where: {id: {[Op.eq]: id }}}
                                    )
                return res.status(201).json({ mensagem:`Mudança de estado do item ${req.params.id}`})
            
            } if (estadoAntigo == "Desativado Temporario") {
                const contratoAtual = await Contrato.update(
                                        {estado: estado},
                                        {where: {id: {[Op.eq]: id }}}
                                    )
                if (estado == "Cancelado")
                    await Contrato.destroy( {where: {id: id } })
                
                await Historico.create({estado, estadoAntigo})
                return res.status(204).json({ mensagem:`Mudança de estado do item ${req.params.id}`})
            } else {
                return res.status(400).json({ mensagem:'Não é possível realizar a atualização do estado'})
            }
            
        } catch (error){
            return res.status(400).json(error)
        }
    },
    async delete(req, res){
        const id = req.params.id
        try {            
            const contrato = await Contrato.findAll({ where: {id: id} })
            const estado = contrato['0'].estado
            await Historico.create({contrato_id: id, estado_posterior: 'Desativado Temporario', estado_anterior: estado})
            await Contrato.destroy( {where: {id: id } })
            return res.status(204).json({mensagem: `Exclusão de item de ID ${req.params.id} feita com sucesso!`})
        } catch (err) {
            return res.status(400).json({mensagem:'Erro na exclusão'})
        }
    },
}