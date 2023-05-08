module.exports = {
  tableName: 'endereco_cliente',
  up: async (knex) => {
    await knex.schema.createTable('endereco_cliente', (table) => {
      table.increments('id').primary();
      table.integer('cliente_id').unsigned();
      table.string('cep');
      table.string('logradouro');
      table.string('complemento');
      table.string('bairro');
      table.string('cidade');
      table.string('estado', 2);
    });
  },
};
