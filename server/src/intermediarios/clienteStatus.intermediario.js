const servicoCompartilhado = require('../servicos/dbCompartilhado.servico');
const TratamentoDeErro = require('./tratamentoDeErros/tratamentoDeErro.class');

async function validarStatusCliente(req, res, next) {
  try {
    const { status } = servicoCompartilhado.extrairCampos(req, ['status']);

    if (!status) throw new TratamentoDeErro('É preciso passar um código de status!', 400);

    req.status = status;
    next();
  } catch (erro) {
    next(erro);
  }
}

module.exports = validarStatusCliente;
