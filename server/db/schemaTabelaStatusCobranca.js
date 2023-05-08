module.exports = {
  tableName: 'status_cobranca',
  up: async (knex) => {
    await knex.schema.createTable('status_cobranca', (table) => {
      table.increments('id').primary();
      table.string('descricao').notNullable().unique();
    });

    await knex('status_cobranca').insert([{ descricao: 'Pendente' }, { descricao: 'Paga' }, { descricao: 'Vencida' }]);
  },
};
