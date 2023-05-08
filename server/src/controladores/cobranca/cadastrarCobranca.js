const servicoCobranca = require('../../servicos/dbCobranca.servico');
const servicoCompartilhado = require('../../servicos/dbCompartilhado.servico');
const moment = require('moment/moment');

module.exports = async function (req, res) {
  const { cliente_id, descricao, valor, vencimento, status_id } = servicoCompartilhado.extrairCampos(req, [
    'cliente_id',
    'descricao',
    'valor',
    'vencimento',
    'status_id',
  ]);

  const [cobrancaCadastrada] = await servicoCobranca.cadastrar({ cliente_id, descricao, valor, vencimento, status_id });

  res.status(201).json(cobrancaCadastrada);
};
