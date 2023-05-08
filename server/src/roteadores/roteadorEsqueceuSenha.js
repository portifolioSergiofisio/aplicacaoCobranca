const efetuarReseteSenha = require('../controladores/usuario/efetuarReseteSenha');
const criarReseteSenha = require('../controladores/usuario/criarReseteSenha');

const rotas = require('express').Router();

rotas.post('/esqueceusenha', criarReseteSenha);
rotas.post('/esqueceusenha/:token', efetuarReseteSenha);

module.exports = rotas;
