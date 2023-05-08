module.exports = {
  tableName: 'usuarios',
  up: async (knex) => {
    await knex.schema.createTable('usuarios', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('senha').notNullable();
      table.string('cpf').unique();
      table.string('telefone').unique();
    });
  },
};
