const migracoes = [
  require('./schemaTabelaUsuarios'),
  require('./schemaTabelaStatusCliente'),
  require('./schemaTabelaEnderecoCliente'),
  require('./schemaTabelaCliente'),
  require('./schemaTabelaStatusCobranca'),
  require('./schemaTabelaCobrancas'),
  require('./schemaTabelaEsqueceuSenha')
];

module.exports = async (knex) => {
  try {
    for (const migracao of migracoes) {
      const { tableName } = migracao;
      const tableExists = await knex.schema.hasTable(tableName);
      if (!tableExists) {
        await migracao.up(knex);
        return console.log(`Tabela ${tableName} criada com sucesso`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
