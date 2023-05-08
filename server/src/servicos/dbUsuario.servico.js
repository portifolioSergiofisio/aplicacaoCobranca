const knex = require('../../conexao');
const TratamentoDeErro = require('../intermediarios/tratamentoDeErros/tratamentoDeErro.class');

const servicoUsuario = {};

/**
 * Cadastra um novo usuário no banco de dados.
 *
 * @async
 * @function cadastrar
 * @param {object} novo_usuario - O novo usuário a ser cadastrado.
 * @param {string} novo_usuario.nome - O nome do novo usuário.
 * @param {string} novo_usuario.email - O email do novo usuário.
 * @param {string} novo_usuario.senha - A senha encriptada do novo usuário.
 * @returns {Promise<object>} Retorna um objeto com as informações do novo usuário cadastrado, incluindo o id, nome, email, cpf e telefone.
 */
servicoUsuario.cadastrar = async (novo_usuario) => {
  const novoUsuario = await knex.transaction(async (trx) => {
    const [usuario] = await trx('usuarios').insert(novo_usuario).returning(['id', 'nome', 'email', 'cpf', 'telefone']);
    return usuario;
  });
  return novoUsuario;
};

/**
 * Atualiza o cadastro de um usuário no banco de dados.
 *
 * @async
 * @function
 * @param {number} id - O ID do usuário a ser atualizado.
 * @param {object} dadosAtualizados - Um objeto contendo as informações a serem atualizadas do usuário.
 * @param {string} dadosAtualizados.nome - O novo nome do usuário.
 * @param {string} dadosAtualizados.email - O novo email do usuário.
 * @param {string} dadosAtualizados.senha - A nova senha do usuário.
 * @param {string} dadosAtualizados.cpf - O novo CPF do usuário.
 * @param {string} dadosAtualizados.telefone - O novo telefone do usuário.
 * @returns {Promise} Uma Promise que resolve com o resultado da transação do banco de dados.
 */
servicoUsuario.atualizarCadastro = async (id, { nome, email, senha, cpf, telefone }) => {
  return await knex.transaction(async (trx) => {
    await trx('usuarios').where({ id }).update({
      nome,
      email,
      senha,
      cpf,
      telefone,
    });
  });
};

/**
 * Cadastra um token de resete de senha para um usuário no banco de dados.
 *
 * @async
 * @function cadastrarReseteSenha
 * @param {number} usuario_id - O ID do usuário para o qual o token de resete de senha será cadastrado.
 * @param {string} resete_token - O token de resete de senha para ser cadastrado.
 * @param {Date} expira_em - A data de expiração do token de resete de senha.
 * @returns {Promise} Uma promessa que resolve quando o token de resete de senha é cadastrado com sucesso.
 */
servicoUsuario.cadastrarReseteSenha = async (usuario_id, resete_token, expira_em) => {
  return knex.transaction(async (trx) => {
    await trx('resete_senha_usuario').insert({
      usuario_id,
      resete_token,
      expira_em,
    });
  });
};

/**
 * Deleta um registro da tabela 'resete_senha_usuario' correspondente ao ID do usuário especificado.
 *
 * @async
 * @function deletarReseteSenha
 * @param {number} resete_token - O registro a ser deletado.
 * @returns {Promise<void>} Uma promessa que resolve quando o registro é deletado com sucesso.
 */
servicoUsuario.deletarReseteSenha = async (resete_token) => {
  return knex.transaction(async (trx) => {
    await trx('resete_senha_usuario').where({ resete_token }).del();
  });
};
/**
 *
 * @param {string} id - O id do usuário que vai se logar
 * @param {string} tempo [tempo='1d'] - Tempo até a validade do token expirar.
 * @returns {string} O token do usuário.
 */
servicoUsuario.criarToken = (id, tempo = '7d') => {
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ id }, process.env.JWT_SECRETKEY, { expiresIn: tempo });
  return token;
};

/**
 * Retorna o token enviado pelo cliente.
 * @param {object} req - O objeto da solicitação HTTP.
 * @returns {string}
 */
servicoUsuario.obterToken = (req) => {
  const autorizacao = req.headers['authorization'];

  if (!autorizacao) {
    return '';
  }
  
  return autorizacao.split(' ')[1];
};

servicoUsuario.criarReseteToken = () => {
  const crypto = require('crypto');
  const moment = require('moment');
  const reseteToken = crypto.randomBytes(32).toString('hex');
  const resete_token = reseteToken;
  const expira_em = moment().add(1, 'hours').toDate(); // 1 hora
  return { resete_token, expira_em };
};

module.exports = servicoUsuario;
