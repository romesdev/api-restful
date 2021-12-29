const Contrato  = require('../controllers/Contrato')
const Historico  = require('../controllers/Historico')

module.exports = function (app) {
    // listagem
    app.get('/api/v1/contratos', Contrato.list)
    app.get('/api/v1/contratos/:id', Contrato.show)
    app.get('/api/v1/contratos/:id/historico', Historico.list)
    // salvar
    app.post('/api/v1/contratos', Contrato.create)
    // atualizar
    app.put('/api/v1/contratos/:id', Contrato.update)
    // deletar
    app.delete('/api/v1/contratos/:id', Contrato.delete)
}