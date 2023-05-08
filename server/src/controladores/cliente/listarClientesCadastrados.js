const TratamentoDeErro = require('../../intermediarios/tratamentoDeErros/tratamentoDeErro.class');
const servicoCliente = require('../../servicos/dbCliente.servico');

module.exports = async function (req, res, next) {
  try {
    await servicoCliente.atualizarStatusClientes();

    const listaDeClientes = await servicoCliente.obterClientesCadastrados();

    if (!listaDeClientes) throw new TratamentoDeErro('Lista de clientes indefinida na rota get /cliente');

    return res.json(listaDeClientes);
  } catch (erro) {
    next(erro);
  }
};
