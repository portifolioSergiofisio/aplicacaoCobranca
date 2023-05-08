const TratamentoDeErro = require('../../intermediarios/tratamentoDeErros/tratamentoDeErro.class');
const servicoCliente = require('../../servicos/dbCliente.servico');

module.exports = async function (req, res) {
  if (!req.cliente) throw new TratamentoDeErro('Sem cliente na rota get /cliente/[id]!');

  const { id: cliente_id } = req.cliente;
  const cliente = await servicoCliente.obterClienteCompletoCadastradoPorId(cliente_id);
  return res.json(cliente);
};
