const TratamentoDeErro = require('./tratamentoDeErro.class');

function tratamentoRotaNaoEncontrada(req, res, next) {
  const erro = new TratamentoDeErro(`A rota '${req.url}' não foi encontrada.`, 404);
  next(erro);
}

module.exports = tratamentoRotaNaoEncontrada;
