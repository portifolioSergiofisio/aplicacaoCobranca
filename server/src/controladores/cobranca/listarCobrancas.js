const moment = require('moment/moment');
const TratamentoDeErro = require('../../intermediarios/tratamentoDeErros/tratamentoDeErro.class');
const servicoCobranca = require('../../servicos/dbCobranca.servico');

module.exports = async function (req, res, next) {
  try {
    //const { cliente_id } = req.query;

    let listaTotalCobrancas = await servicoCobranca.totalCobrancas();

    return res.json(listaTotalCobrancas);
  } catch (erro) {
    next(erro);
  }
};
