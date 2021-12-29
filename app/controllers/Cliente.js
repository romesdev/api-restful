const Sequelize = require('sequelize');
const Cliente = require('../models/Cliente')
const Ponto = require('../models/Ponto')
const viewCliente = require('../views/Cliente')

module.exports = {
    async list(req, res){
        const filter = req.query
        
        try {
            let clientes = ''
            if (filter != null) 
                clientes = await Cliente.findAll( { where: filter } )
            else{
                clientes = await Cliente.findAll()
            } 
            return res.status(200).json({dados: viewCliente.renderMany(clientes)})
        } catch (err) {
            return res.status(400).json(error)
        }
    },
    async show(req, res){
        try {
            const cliente = await Cliente.findAll({where: {id: req.params.id}});
            return res.status(200).json(viewCliente.render(cliente['0']))
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async create(req, res){
        const {nome, tipo} = req.body;
        try {
            const cliente = await Cliente.restore( { // tenta restaurar um registro deletado
                where: {nome: nome, tipo: tipo, 
                        data_remocao: {
                            [Sequelize.Op.not]: null
                        }} })
            
            if (cliente != 1){ // criar um novo registro
                let clienteNovo = await Cliente.create({nome, tipo})
                return res.status(201).json(clienteNovo)
            }

            // retorna um registro restaurado atualizado 
            return res.status(204).json(cliente)
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
        let id = req.params.id

        try {
            await Ponto.destroy( {where: { cliente_id: id } })
            await Cliente.destroy({where: { id: id } })
            return res.status(204).json({msg: `Exclusão de item de ID ${req.params.id} feita com sucesso!`})
        } catch (error) {
            console.error(error)
            return res.status(400).json(error);            
        }
    },
}