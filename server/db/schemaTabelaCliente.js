module.exports = {
  tableName: 'cliente',
  up: async (knex) => {
    await knex.schema.createTable('cliente', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('cpf', 14).notNullable().unique();
      table.string('telefone').notNullable().unique();
      table.integer('endereco_id').unsigned().notNullable().references('id').inTable('endereco_cliente');
      table.integer('status_id').unsigned().notNullable().references('id').inTable('status_cliente');
    });
  },
};
