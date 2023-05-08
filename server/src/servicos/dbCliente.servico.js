const knex = require('../../conexao');

const servicoCliente = {};

/**
 * Cadastra um novo cliente no banco de dados.
 *
 * @async
 * @function cadastro
 * @param {object} novoUsuario - O objeto contendo as informações do novo cliente a ser cadastrado.
 * @param {string} novoUsuario.nome - O nome do novo cliente.
 * @param {string} novoUsuario.email - O email do novo cliente.
 * @param {string} novoUsuario.cpf - O CPF do novo cliente. O CPF deve estar no formato "xxx.xxx.xxx-xx"
 * @param {string} novoUsuario.telefone - O número de telefone do novo cliente. O telefone deve ter o formato (xx) xxxxx-xxxx
 * @param {object} novoUsuario.endereco - O objeto contendo as informações do endereço do novo cliente.
 * @param {string} novoUsuario.endereco.cidade - A cidade do endereço do novo cliente.
 * @param {string} novoUsuario.endereco.estado - O estado do endereço do novo cliente.
 * @param {string} novoUsuario.endereco.complemento - O complemento do endereço do novo cliente.
 * @param {string} novoUsuario.endereco.logradouro - O logradouro do endereço do novo cliente.
 * @param {string} novoUsuario.endereco.bairro - O bairro do endereço do novo cliente.
 * @param {string} novoUsuario.endereco.cep - O CEP do endereço do novo cliente.
 * @returns {Promise<number>} Retorna o ID do novo cliente cadastrado.
 */
servicoCliente.cadastro = async (novoUsuario) => {
  const { endereco, ...usuario_temp } = novoUsuario;
  return knex.transaction(async (trx) => {
    const [endereco_temp] = await trx('endereco_cliente')
      .insert({
        ...endereco,
      })
      .returning('id');

    const [cliente_temp] = await trx('cliente')
      .insert({
        ...usuario_temp,
        endereco_id: endereco_temp.id,
        status_id: 1,
      })
      .returning('id');

    await trx('endereco_cliente')
      .update({
        cliente_id: cliente_temp.id,
      })
      .where({ id: endereco_temp.id })
      .returning('*');

    return cliente_temp.id;
  });
};

/**
 * Atualiza o cadastro de um cliente no banco de dados.
 *
 * @function atualizarCadastro
 * @async
 * @param {number} id - O ID do cliente a ser atualizado.
 * @param {number} endereco_id - O ID do endereço do cliente na tabela endereco_cliente.
 * @param {object} clienteAtualizado - O objeto contendo as informações do novo cliente a ser cadastrado.
 * @param {string} clienteAtualizado.nome - O nome do novo cliente.
 * @param {string} clienteAtualizado.email - O email do novo cliente.
 * @param {string} clienteAtualizado.cpf - O CPF do novo cliente. O CPF deve estar no formato "xxx.xxx.xxx-xx"
 * @param {string} clienteAtualizado.telefone - O número de telefone do novo cliente. O telefone deve ter o formato (xx) xxxxx-xxxx
 * @param {object} clienteAtualizado.endereco - O objeto contendo as informações do endereço do novo cliente.
 * @param {string} clienteAtualizado.endereco.cidade - A cidade do endereço do novo cliente.
 * @param {string} clienteAtualizado.endereco.estado - O estado do endereço do novo cliente.
 * @param {string} clienteAtualizado.endereco.complemento - O complemento do endereço do novo cliente.
 * @param {string} clienteAtualizado.endereco.logradouro - O logradouro do endereço do novo cliente.
 * @param {string} clienteAtualizado.endereco.bairro - O bairro do endereço do novo cliente.
 * @param {string} clienteAtualizado.endereco.cep - O CEP do endereço do novo cliente.
 * @returns {Promise<void>} Uma Promise que será resolvida quando a atualização for concluída.
 */
servicoCliente.atualizarCadastro = async (id, endereco_id, clienteAtualizado) => {
  const { endereco, ...cliente_temp } = clienteAtualizado;

  return knex.transaction(async (trx) => {
    await trx('endereco_cliente')
      .where({ id: endereco_id })
      .update({
        ...endereco,
      });

    await trx('cliente')
      .where({ id })
      .update({
        ...cliente_temp,
      });
  });
};

/**
 * Retorna uma lista de clientes cadastrados, incluindo informações sobre endereço e status.
 *
 * @async
 * @function obterClientesCadastrados
 * @throws {Error} Se houver um erro ao consultar o banco de dados.
 * @returns {Promise<object[]>} Uma promise que resolve em um array de objetos contendo as informações dos clientes cadastrados.
 */
servicoCliente.obterClientesCadastrados = async () => {
  return knex
    .select(
      'cliente.id',
      'cliente.nome',
      'cliente.email',
      'cliente.cpf',
      'cliente.telefone',
      knex.raw(`
      json_build_object(
        'logradouro', endereco.logradouro,
        'complemento', endereco.complemento,
        'cep', endereco.cep,
        'bairro', endereco.bairro,
        'cidade', endereco.cidade,
        'estado', endereco.estado
      ) AS endereco
    `),
      'status_cliente.id AS status'
    )
    .from('cliente')
    .innerJoin('endereco_cliente AS endereco', 'cliente.endereco_id', '=', 'endereco.id')
    .leftJoin('status_cliente', 'cliente.status_id', '=', 'status_cliente.id');
};

/**
 * Obtém um cliente completo cadastrado por seu ID.
 *
 * @async
 * @function obterClienteCompletoCadastradoPorId
 * @param {number} cliente_id - O ID do cliente a ser obtido.
 * @returns {Promise<object>} Um objeto contendo as informações do cliente obtido.
 */
servicoCliente.obterClienteCompletoCadastradoPorId = async (cliente_id) => {
  return knex
    .first(
      'cliente.id',
      'cliente.nome',
      'cliente.email',
      'cliente.cpf',
      'cliente.telefone',
      knex.raw(`
    json_build_object(
      'logradouro', endereco.logradouro,
      'complemento', endereco.complemento,
      'cep', endereco.cep,
      'bairro', endereco.bairro,
      'cidade', endereco.cidade,
      'estado', endereco.estado
    ) AS endereco
  `),
      'status_cliente.nome AS status'
    )
    .from('cliente')
    .innerJoin('endereco_cliente AS endereco', 'cliente.endereco_id', '=', 'endereco.id')
    .leftJoin('status_cliente', 'cliente.status_id', '=', 'status_cliente.id')
    .where('cliente.id', cliente_id);
};

/**
 * Deleta um cliente e todos os seus endereços relacionados.
 *
 * @async
 * @function deletarCliente
 * @param {number} id - O ID do cliente a ser deletado.
 * @returns {Promise<void>} Uma promise que resolve quando a transação for concluída com sucesso.
 */
servicoCliente.deletarCliente = async (id) => {
  return knex.transaction(async (trx) => {
    await trx('cliente').where({ id }).del();
    await trx('endereco_cliente').where({ cliente_id }).del();
  });
};

/**
 * Atualiza o status dos clientes inadimplentes no banco de dados.
 *
 * @async
 * @function atualizarStatusClientesInadimplentes
 * @returns {Promise} Uma Promise que é resolvida quando a atualização é concluída.
 */
servicoCliente.atualizarStatusClientes = async () => {
  return knex.transaction(async (trx) => {
    await trx('cliente')
      .whereIn('id', function () {
        this.select('cliente_id').distinct().from('cobrancas').whereNot({ status_id: 2 }).andWhere('vencimento', '<=', knex.raw("NOW() - INTERVAL '1 day'"));
      })
      .update('status_id', '2');

    await trx('cliente')
      .where('status_id', 2)
      .whereNotExists(function () {
        this.select('*')
          .from('cobrancas')
          .whereRaw('cobrancas.cliente_id = cliente.id')
          .where('status_id', 1)
          .where('vencimento', '<', knex.raw(`NOW() - INTERVAL '1 DAY'`));
      })
      .update({ status_id: 1 });
  });
};

/**
 * Atualiza o status de um cliente no banco de dados.
 *
 * @async
 * @function atualizarStatus
 * @param {number} id - O ID do cliente a ser atualizado.
 * @param {number} status_id - O novo ID de status do cliente.
 * @returns {Promise<void>} Uma promessa vazia que é resolvida quando a atualização é concluída com sucesso.
 */
servicoCliente.atualizarStatus = async (id, status_id) => {
  return knex.transaction(async (trx) => {
    await trx('cliente').where({ id }).update({ status_id });
  });
};

/**
 * Obtém um array de clientes filtrados por status_id .
 *
 * @async
 * @function clientesFiltrados
 * @param {number} status_id - O status das cobranças a serem filtradas. 1 -> 'pendente' ou 2 -> 'pago'
 * @returns {Promise<object[]>} Um array de objetos contendo as informações da cobrança.
 */
servicoCliente.clientesFiltrados = async (status_id) => {
  return await knex
    .select('c.id AS cliente_id', 'c.nome', 'c.cpf', 'cob.id', 'cob.descricao', 'cob.valor', 'cob.vencimento', 'cob.status_id')
    .from('cliente as c')
    .join('cobrancas as cob', 'c.id', '=', 'cob.cliente_id')
    .where('status_id', status_id);
};

module.exports = servicoCliente;
