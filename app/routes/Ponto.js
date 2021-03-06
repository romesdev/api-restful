const Ponto = require('../controllers/Ponto')

module.exports = function (app) {
    // listagem
    app.get('/api/v1/pontos', Ponto.list)
    app.get('/api/v1/pontos/:id', Ponto.show)
    // salvar
    app.post('/api/v1/pontos', Ponto.create)
    // deletar
    app.delete('/api/v1/pontos/:id', Ponto.delete)
}