const TratamentoDeErro = require("../../intermediarios/tratamentoDeErros/tratamentoDeErro.class");

module.exports = async function (req, res) {
    if (!req.cobranca) throw new TratamentoDeErro('Sem cobrança na rota get /cobranca/[id]!');

    const { cliente_id, created_at, updated_at, ...cobranca } = req.cobranca;
    
    res.json(cobranca);
}