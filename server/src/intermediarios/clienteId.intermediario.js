const servicoCompartilhado = require('../servicos/dbCompartilhado.servico');
const TratamentoDeErro = require('./tratamentoDeErros/tratamentoDeErro.class');

async function clienteId(req, res, next, id) {
  try {
    if (!id) return next();

    const cliente_id = parseInt(id);

    if (isNaN(cliente_id)) {
      throw new TratamentoDeErro(`ID ${id} do cliente informado é inválido.`, 400);
    }

    const cliente = await servicoCompartilhado.obterUm({ id: cliente_id }, 'cliente');

    if (!cliente) throw new TratamentoDeErro('Cliente informado não encontrado.', 404);

    req.cliente = cliente;

    next();
  } catch (erro) {
    next(erro);
  }
}

module.exports = clienteId;
