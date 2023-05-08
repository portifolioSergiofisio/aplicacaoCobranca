module.exports = {
  tableName: 'status_cliente',
  up: async (knex) => {
    await knex.schema.createTable('status_cliente', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable().unique();
    });

    await knex('status_cliente').insert([{ nome: 'Em Dia' }, { nome: 'Inadimplente' }]);
  },
};
