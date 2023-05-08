const servicoCobranca = require('../../servicos/dbCobranca.servico');
const servicoCompartilhado = require('../../servicos/dbCompartilhado.servico');

module.exports = async function (req, res) {
  const { descricao, valor, vencimento, status_id } = servicoCompartilhado.extrairCampos(req, ['descricao', 'valor', 'vencimento', 'status_id']);
  const { id: cobranca_id, cliente_id } = req.cobranca;

  const [cobrancaAtualizada] = await servicoCobranca.atualizar(cobranca_id, cliente_id, { descricao, valor, vencimento, status_id });
  res.json(cobrancaAtualizada);
};
