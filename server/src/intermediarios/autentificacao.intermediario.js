const knex = require('../../conexao');
const jwt = require('jsonwebtoken');
const servicoUsuario = require('../servicos/dbUsuario.servico');
const TratamentoDeErro = require('./tratamentoDeErros/tratamentoDeErro.class');

async function autenticacao(req, res, next) {
  const token = servicoUsuario.obterToken(req);

  const mensagemFalhaAutenticacao = 'Para acessar este recurso um token de autenticação válido deve ser enviado.';

  try {
    if (!token) throw new TratamentoDeErro(mensagemFalhaAutenticacao, 401);

    const [header, payload, signature] = token.split(/\./g);

    if (!header || !payload || !signature) {
      console.log(header);
      console.log(payload);
      console.log(signature);
      throw new TratamentoDeErro(`Token com formato inválido: ${token})`);
    }

    const { id: usuario_id } = jwt.verify(token, process.env.JWT_SECRETKEY);

    if (!usuario_id) throw new TratamentoDeErro('Incapaz de recuperar o id do usuário no token');

    const usuario = await knex('usuarios').first('id', 'nome', 'email', 'cpf', 'telefone').where({ id: usuario_id });

    if (!usuario) throw new TratamentoDeErro(mensagemFalhaAutenticacao, 401);

    req.usuario = usuario;
    next();
  } catch (erro) {
    if (erro.name === 'TokenExpiredError') {
      console.log(`Token expirado: ${token}`);
      const expiredTokenError = new TratamentoDeErro('Autorização expirada.', 419);
      return next(expiredTokenError);
    }
    next(erro);
  }
}

module.exports = autenticacao;
