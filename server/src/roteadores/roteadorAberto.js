const cadastrarUsuario = require('../controladores/usuario/cadastrarUsuario');
const logarUsuario = require('../controladores/usuario/logarUsuario');
const { validarDadosUsuario, loginUsuarioIntermediario } = require('../intermediarios/usuario.intermediario');
const validarSchema = require('../lib/validarSchema');
const { cadastroUsuarioSchema, loginUsuarioSchema, validarEmailSchema } = require('../schemas/joiSchemas');
const confirmacaoDisponivel = require('../controladores/usuario/confirmacaoDadosUsuario');

const rotas = require('express').Router();

rotas.post('/cadastro', validarSchema(cadastroUsuarioSchema), validarDadosUsuario, cadastrarUsuario);
rotas.post('/login', validarSchema(loginUsuarioSchema), loginUsuarioIntermediario, logarUsuario);

rotas.post('/v/usuario/email', validarSchema(validarEmailSchema), validarDadosUsuario, confirmacaoDisponivel);


module.exports = rotas;
