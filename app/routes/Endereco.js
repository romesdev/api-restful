const Endereco  = require('../controllers/Endereco')

module.exports = function (app) {
    // listagem
    app.get('/api/v1/enderecos', Endereco.list)
    app.get('/api/v1/enderecos/:id', Endereco.show)
    // salvar
    app.post('/api/v1/enderecos', Endereco.create)
    // atualizar
    app.put('/api/v1/enderecos/:id', Endereco.update)
    // deletar
    app.delete('/api/v1/enderecos/:id', Endereco.delete)
}