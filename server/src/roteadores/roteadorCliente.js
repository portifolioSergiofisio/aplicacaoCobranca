const cadastrarCliente = require('../controladores/cliente/cadastrarCliente');
const clientePorId = require('../controladores/cliente/listarClientePorId');
const deletarCliente = require('../controladores/cliente/deletarCliente');
const listarClientesCadastrados = require('../controladores/cliente/listarClientesCadastrados');
const clienteId = require('../intermediarios/clienteId.intermediario');
const validarSchema = require('../lib/validarSchema');
const { cadastrarClienteSchema, clienteStatusSchema } = require('../schemas/joiSchemas');
const atualizarCliente = require('../controladores/cliente/atualizarCliente');
const validarCliente = require('../intermediarios/cliente.intermediario');
const validarStatusCliente = require('../intermediarios/clienteStatus.intermediario');
const atualizarStatusCliente = require('../controladores/cliente/atualizarStatusCliente');
const filtrarCliente = require('../controladores/cliente/filtrarCliente');

const rotas = require('express').Router();

rotas.param('id', clienteId);

rotas.get('/cliente/:id', clientePorId);
rotas.put('/cliente/:id/status', validarSchema(clienteStatusSchema), validarStatusCliente, atualizarStatusCliente);
rotas.put('/cliente/:id', validarSchema(cadastrarClienteSchema), validarCliente, atualizarCliente);
rotas.delete('/cliente/:id', deletarCliente);

rotas.get('/cliente', listarClientesCadastrados);
rotas.post('/cliente', validarSchema(cadastrarClienteSchema), validarCliente, cadastrarCliente);

rotas.get('/cliente/filtro', filtrarCliente);

module.exports = rotas;
