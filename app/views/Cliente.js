function render (cliente) {
    return {
        nome: cliente.nome,
        tipo: cliente.tipo
    }
}

module.exports.render = render

function renderMany (clientes) {
    return clientes.map(render)
}

module.exports.renderMany = renderMany