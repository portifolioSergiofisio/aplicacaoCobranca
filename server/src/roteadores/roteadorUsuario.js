const atualizarUsuario = require('../controladores/usuario/atualizarUsuario');
const obterUsuario = require('../controladores/usuario/obterUsuario');
const validarSchema = require('../lib/validarSchema');
const { validarDadosUsuario } = require('../intermediarios/usuario.intermediario');
const { autalizarUsuarioSchema } = require('../schemas/joiSchemas');

const rotas = require('express').Router();

rotas.put('/usuario', validarSchema(autalizarUsuarioSchema), validarDadosUsuario, atualizarUsuario);
rotas.get('/usuario', obterUsuario);

module.exports = rotas;
