const migracao = require('./db/migracao');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME,
    ssl: { rejectUnauthorized: false },
  },
  pool: { min: 2, max: 10 },
  acquireConnectionTimeout: 10000,
});

(async () => {
  await migracao(knex);
})();

module.exports = knex;
