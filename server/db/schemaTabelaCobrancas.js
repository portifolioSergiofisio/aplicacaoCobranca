module.exports = {
  tableName: 'cobrancas',
  up: async (knex) => {
    await knex.schema.createTable('cobrancas', (table) => {
      table.increments('id').primary();
      table.integer('cliente_id').notNullable().references('id').inTable('cliente');
      table.string('descricao');
      table.integer('status_id').notNullable().defaultTo(1).references('id').inTable('status_cobranca');
      table.bigInteger('valor').notNullable();
      table.date('vencimento').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  },
};
