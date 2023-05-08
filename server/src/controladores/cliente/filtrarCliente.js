const servicoCliente = require("../../servicos/dbCliente.servico");

module.exports = async function (req, res, next) {
    try {
        const { status_id } = req.cobranca;
        const clientesFiltrados = await servicoCliente.clientesFiltrados(status_id);

        return res.json(clientesFiltrados)
    } catch (erro) {
        next(erro);
    }

}
