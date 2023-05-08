const { default: axios } = require('axios');
const servicoCompartilhado = require('../servicos/dbCompartilhado.servico');

const rotas = require('express').Router();

rotas.get('/v/cliente', async (req, res) => {
  if (req.query.email) await servicoCompartilhado.validarCampoId(req, res, 'email', 'cliente');

  if (req.query.cpf) await servicoCompartilhado.validarCampoId(req, res, 'cpf', 'cliente');

  if (req.query.telefone) await servicoCompartilhado.validarCampoId(req, res, 'telefone', 'cliente');
});

rotas.get('/v/usuario', async (req, res) => {
  if (req.query.email) await servicoCompartilhado.validarCampoId(req, res, 'email', 'usuarios');

  if (req.query.cpf) await servicoCompartilhado.validarCampoId(req, res, 'cpf', 'usuarios');

  if (req.query.telefone) await servicoCompartilhado.validarCampoId(req, res, 'telefone', 'usuarios');
});

rotas.get('/v/endereco/:cep', async (req, res, next) => {
  const cep = req.params.cep.replace(/\D/g, ''); // remove caracteres não numéricos
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = rotas;
