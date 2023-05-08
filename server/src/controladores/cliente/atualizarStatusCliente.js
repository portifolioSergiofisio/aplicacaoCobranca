const TratamentoDeErro = require('../../intermediarios/tratamentoDeErros/tratamentoDeErro.class');
const servicoCliente = require('../../servicos/dbCliente.servico');

module.exports = async function (req, res, next) {
  try {
    if (!req.status) throw new TratamentoDeErro('req.status na rota atualizar status cliente está indefinido!')
    const cliente_status = req.status;

    
    await servicoCliente.atualizarStatus(req.cliente.id, cliente_status)
    const cliente = await servicoCliente.obterClienteCompletoCadastradoPorId(req.cliente.id);

    return res.json(cliente);
  } catch (erro) {
    next(erro);
  }
};