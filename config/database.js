const knex = require('knex');

const database = knex({
  client: 'pg',
  connection: 'postgres://postgres:password@127.0.0.1:5432/postgres', // url postgres //user:password
  searchPath: ['public'], // schema
});

module.exports = database;
