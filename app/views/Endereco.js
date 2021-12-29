function render (endereco) {
    return {
        logradouro: endereco.logradouro, 
        bairro: endereco.bairro, 
        numero: endereco.numero
    }
}

module.exports.render = render

function renderMany (enderecos) {
    return enderecos.map(render)
}

module.exports.renderMany = renderMany