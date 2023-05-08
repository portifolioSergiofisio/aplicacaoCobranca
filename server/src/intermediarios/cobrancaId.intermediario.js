const servicoCompartilhado = require('../servicos/dbCompartilhado.servico');
const TratamentoDeErro = require('./tratamentoDeErros/tratamentoDeErro.class');

async function cobrancaId(req, res, next, id) {
  try {
    const cobranca_id = Number.parseInt(id);
    if (isNaN(cobranca_id)) {
      throw new TratamentoDeErro(`Cobrança informada ${id} não é inválida.`, 400);
    }

    const cobrancaEncontrada = await servicoCompartilhado.obterUm({ id: cobranca_id }, 'cobrancas');
    
    if (!cobrancaEncontrada) throw new TratamentoDeErro('Cobrança informada não encontrada.', 404);

    const { createt_at, updated_at, ...cobranca } = cobrancaEncontrada;
    req.cobranca = cobranca;

    next();
  } catch (erro) {
    next(erro);
  }
}

module.exports = cobrancaId;
