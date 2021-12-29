function render (ponto) {
    return {
        id: ponto.id,
        cliente_id: ponto.cliente.id,
        cliente_nome: ponto.cliente.nome,
        cliente_tipo: ponto.cliente.tipo,
        endereco_id: ponto.endereco.id,
        endereco_logradouro: ponto.endereco.logradouro,
        endereco_bairro: ponto.endereco.bairro,
        endereco_numero: ponto.endereco.numero
    }
}

module.exports.render = render

function renderMany (pontos) {
    return pontos.map(render)
}

module.exports.renderMany = renderMany