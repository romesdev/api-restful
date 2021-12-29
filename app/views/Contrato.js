function render (contrato) {
    return {
        id: contrato.id,
        cliente_id: contrato.ponto.cliente.id,
        cliente_nome: contrato.ponto.cliente.nome,
        cliente_tipo: contrato.ponto.cliente.tipo,
        endereco_id: contrato.ponto.endereco.id,
        endereco_logradouro: contrato.ponto.endereco.logradouro,
        endereco_bairro: contrato.ponto.endereco.bairro,
        endereco_numero: contrato.ponto.endereco.numero
    }
}

module.exports.render = render

function renderMany (contratos) {
    return contratos.map(render)
}

module.exports.renderMany = renderMany