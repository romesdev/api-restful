const http = require('http')
const app = require('./config/express')()
var db = require('./config/sequelize')
const Cliente = require('./app/models/Cliente')

http.createServer(app).listen(app.get('port'), function () {

    
    console.log('Servidor Express funcionando na porta ' + app.get('port'))

})

