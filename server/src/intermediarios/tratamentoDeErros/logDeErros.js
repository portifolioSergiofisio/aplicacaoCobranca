const TratamentoDeErro = require("./tratamentoDeErro.class");

function logDeErros(err, req, res, next) {
  try {
    if (!err.codigoHttp && err.message) {
      console.log(`Erro: ${err.message}`);
      throw new TratamentoDeErro();
    }

    next(err);
  } catch (erro) {
    next(erro);
  }
}

module.exports = logDeErros;
