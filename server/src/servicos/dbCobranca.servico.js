const knex = require('../../conexao');

const servicoCobranca = {};

/**
 * Cadastra uma nova cobrança no banco de dados.
 *
 * @async
 * @function cadastrar
 * @param {object} novaCobranca - Um objeto contendo as informações da cobrança a ser cadastrada.
 * @returns {Promise<object[]>} Um array contendo as informações da cobrança cadastrada (id, descricao, valor, vencimento, status_id).
 */
servicoCobranca.cadastrar = async (novaCobranca) => {
  return knex.transaction(async (trx) => await trx('cobrancas').insert(novaCobranca).returning(['id', 'descricao', 'valor', 'vencimento', 'status_id']));
};

/**
 * Atualiza uma cobrança no banco de dados.
 *
 * @async
 * @function atualizar
 * @param {number} cobranca_id - O ID da cobrança a ser atualizada.
 * @param {number} cliente_id - O ID do cliente proprietário da cobrança.
 * @param {object} novaCobranca - Um objeto contendo os novos valores para a cobrança.
 * @returns {object[]} Um array contendo os dados atualizados da cobrança.
 */
servicoCobranca.atualizar = async (cobranca_id, cliente_id, novaCobranca) => {
  return knex.transaction(
    async (trx) =>
      await trx('cobrancas').where({ id: cobranca_id, cliente_id }).update(novaCobranca).returning(['id', 'descricao', 'valor', 'vencimento', 'status_id'])
  );
};

/**
 * Deleta uma cobrança de um cliente específico.
 *
 * @async
 * @function deletar
 * @param {number} cobranca_id - O ID da cobrança a ser deletada.
 * @param {number} cliente_id - O ID do cliente proprietário da cobrança.
 * @returns {Promise<void>}
 */
servicoCobranca.deletar = async (cobranca_id, cliente_id) => {
  return knex.transaction(async (trx) => {
    await trx('cobrancas').where({ id: cobranca_id, cliente_id }).del();
    return;
  });
};

/**
 * Obtém um array de cobranças para um determinado cliente.
 *
 * @async
 * @function obterCobrancas
 * @param {number} cliente_id - O ID do cliente para o qual as cobranças devem ser obtidas.
 * @returns {Promise<object[]>} Um array de objetos contendo as informações da cobrança.
 */
servicoCobranca.obterCobrancas = async (parametro) => {
  return await knex('cobrancas').select('id', 'descricao', 'valor', 'vencimento', 'status_id').where(parametro);
};

/**
 * Obtém um array de cobranças independente do cliente.
 *
 * @async
 * @function totalCobrancas
 * @returns {Promise<object[]>} Um array de objetos contendo as informações da cobrança.
 */
servicoCobranca.totalCobrancas = async () => {
  return await knex
    .select('c.id AS cliente_id', 'c.nome', 'c.cpf', 'cob.id', 'cob.descricao', 'cob.valor', 'cob.vencimento', 'cob.status_id')
    .from('cliente as c')
    .join('cobrancas as cob', 'c.id', '=', 'cob.cliente_id');
};

/**
 * Obtém um array de cobranças filtradas por status_id .
 *
 * @async
 * @function cobrancasFiltradas
 * @param {number} status_id - O status das cobranças a serem filtradas. 1 -> 'pendente' ou 2 -> 'pago'
 * @returns {Promise<object[]>} Um array de objetos contendo as informações da cobrança.
 */
servicoCobranca.cobrancasFiltradas = async (status_id) => {

  return await knex.select('c.id AS cliente_id', 'c.nome', 'c.cpf', 'cob.id', 'cob.descricao', 'cob.valor', 'cob.vencimento', 'cob.status_id')
  .from('cliente as c')
  .join('cobrancas as cob', 'c.id', '=', 'cob.cliente_id')
  .where('status_id', status_id)
  
};

module.exports = servicoCobranca;
