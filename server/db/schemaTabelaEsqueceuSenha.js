module.exports = {
  tableName: 'resete_senha_usuario',
  up: async (knex) => {
    await knex.schema.createTable('resete_senha_usuario', function (table) {
      table.increments('id').primary();
      table.string('resete_token').notNullable();
      table.timestamp('expira_em').notNullable();
      table.integer('usuario_id').unsigned().notNullable();
      table.foreign('usuario_id').references('id').inTable('usuarios');
    });
  },
};
