import knex from 'knex';

const knexConnection = knex({
  client: 'postgresql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'formation',
    port: 5435,
  },
  pool: { min: 5, max: 30 },
  migrations: {
    tableName: 'migrations',
  },
});

export default knexConnection;
