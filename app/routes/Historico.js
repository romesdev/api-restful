const Historico = require('../controllers/Historico')

module.exports = function (app) {
    app.get('/api/v1/historico', Historico.list)
}