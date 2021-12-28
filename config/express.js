// importando modulo express (padrao commonJS)
const express = require('express')
const routerCliente = require('../app/routes/Cliente')
const routerEndereco = require('../app/routes/Endereco')
const routerPonto = require('../app/routes/Ponto')
const routerContrato = require('../app/routes/Contrato')
const routerHistorico = require('../app/routes/Historico')

// exportando modulo (padrao CommonJS)
module.exports = function () {
    let app = express();

    // definindo variavel de aplicacao
    app.set('port', 3000);
    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))
    app.use(express.static('./public'))
    
    // rotas utilizadas na aplicacao
    routerCliente(app)
    routerEndereco(app)
    routerPonto(app)
    routerContrato(app)
    routerHistorico(app)
    
    return app;
}