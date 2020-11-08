
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: 'G31mes2c',
  host: '127.0.0.1',
  database: 'assignment_vishalyadav'
});


exports.pool = pool;