const Cliente  = require('../controllers/Cliente')

module.exports = function (app) {
    // listagem
    app.get('/api/v1/clientes', Cliente.list)
    app.get('/api/v1/clientes/:id', Cliente.show)
    // salvar
    app.post('/api/v1/clientes', Cliente.create)
    // atualizar
    app.put('/api/v1/clientes/:id', Cliente.update)
    // deletar
    app.delete('/api/v1/clientes/:id', Cliente.delete)
}