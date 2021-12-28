const Contrato  = require('../controllers/Contrato')

module.exports = function (app) {
    // listagem
    app.get('/api/v1/contrato', Contrato.list)
    app.get('/api/v1/contrato/:id', Contrato.show)
    // salvar
    app.post('/api/v1/contrato', Contrato.create)
    // deletar
    app.delete('/api/v1/contrato/:id', Contrato.delete)
}