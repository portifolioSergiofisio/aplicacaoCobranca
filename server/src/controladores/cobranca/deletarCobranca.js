const servicoCobranca = require("../../servicos/dbCobranca.servico");

module.exports = async function (req, res) {
    const { id: cobranca_id , cliente_id } = req.cobranca;

    await servicoCobranca.deletar(cobranca_id, cliente_id);
    res.status(204).end();
}