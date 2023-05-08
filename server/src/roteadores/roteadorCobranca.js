const atualizarCobranca = require('../controladores/cobranca/atualizarCobranca');
const cadastrarCobranca = require('../controladores/cobranca/cadastrarCobranca');
const deletarCobranca = require('../controladores/cobranca/deletarCobranca');
const filtrarCobrancas = require('../controladores/cobranca/filtrarCobrancas');
const listarCobrancas = require('../controladores/cobranca/listarCobrancas');
const obterCobranca = require('../controladores/cobranca/obterCobranca');
const cobrancaId = require('../intermediarios/cobrancaId.intermediario');
const validarSchema = require('../lib/validarSchema');
const { cobrancaSchema } = require('../schemas/joiSchemas');

const rotas = require('express').Router();

rotas.param('id', cobrancaId);

rotas.get('/cobranca/:id', obterCobranca);
rotas.get('/cobranca', listarCobrancas);
rotas.get('/cobranca/filtro', filtrarCobrancas);
rotas.post('/cobranca', validarSchema(cobrancaSchema), cadastrarCobranca);
rotas.put('/cobranca/:id', atualizarCobranca);
rotas.delete('/cobranca/:id', deletarCobranca);

module.exports = rotas;
