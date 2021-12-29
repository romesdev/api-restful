function render (evento) {
    return {
        id: evento.id,
        data_evento: evento.data_criacao,
        estado_antigo: evento.estado_anterior,
        estado_novo: evento.estado_posterior
    }
}

module.exports.render = render

function renderMany (eventos) {
    return eventos.map(render)
}

module.exports.renderMany = renderMany