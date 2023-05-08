const TratamentoDeErro = require('../intermediarios/tratamentoDeErros/tratamentoDeErro.class');

function validarSchema(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (erro) {
      let mensagem = '';

      if (erro?.details) {
        mensagem = erro?.details?.reduce((anterior, atual) => {
          anterior[atual.path[0]] = atual.message;
          return anterior;
        }, {});
      }
      const err = mensagem ? new TratamentoDeErro(mensagem, 400) : erro;
      next(err);
    }
  };
}

module.exports = validarSchema;
