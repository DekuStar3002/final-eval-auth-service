require('dotenv').config();

module.exports = {
  'development': {
    'username': process.env.DB_USER,
    'password': null,
    'database': process.env.DB_NAME,
    'host': '127.0.0.1',
    'dialect': 'postgres',
    'port': process.env.DB_PORT
  },
  'test': {
    'username': process.env.DB_USER,
    'password': null,
    'database': process.env.DB_NAME,
    'host': '127.0.0.1',
    'dialect': 'postgres',
    'port': process.env.DB_PORT
  }
};
