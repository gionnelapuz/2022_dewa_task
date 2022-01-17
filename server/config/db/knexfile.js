const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  seeds: {
    directory: path.join(__dirname, './seeds'),
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, './migrations'),
  },
};
