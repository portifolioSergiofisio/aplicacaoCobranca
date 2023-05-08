const servicoCobranca = require("../../servicos/dbCobranca.servico");

module.exports = async function (req, res, next) {
    try {
        const { status_id } = req.cobranca;
        const cobrancasFiltradas = await servicoCobranca.cobrancasFiltradas(status_id);

        return res.json(cobrancasFiltradas)
    } catch (erro) {
        next(erro);
    }

}