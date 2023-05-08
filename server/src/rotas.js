const express = require('express');

const tratamentoRotaNaoEncontrada = require('./intermediarios/tratamentoDeErros/tratamentoRotaNaoEncontrada');
const logDeErros = require('./intermediarios/tratamentoDeErros/logDeErros');
const tratamentoDeErros = require('./intermediarios/tratamentoDeErros/tratamentoDeErros');
const autenticacao = require('./intermediarios/autentificacao.intermediario');

const rotas = express();

//TODO: apague me para a main
rotas.use((req, res, next) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('url: ', url);
  console.log('metodo: ', req.method);
  next();
});

rotas.use(require('./roteadores/roteadorVerificacao'));

rotas.use(require('./roteadores/roteadorSwagger'));
rotas.use(require('./roteadores/roteadorAberto'));
rotas.use(require('./roteadores/roteadorEsqueceuSenha'))

rotas.use(autenticacao);

rotas.use(require('./roteadores/roteadorUsuario'));
rotas.use(require('./roteadores/roteadorCliente'));
rotas.use(require('./roteadores/roteadorCobranca'));

rotas.use(tratamentoRotaNaoEncontrada);
rotas.use(logDeErros);
rotas.use(tratamentoDeErros);

module.exports = rotas;
