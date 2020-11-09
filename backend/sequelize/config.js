require('dotenv').config();
module.exports = {
  development: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 20,
      min: 0,
      idle: 5000,
    },
    logging: false,
  },
  production: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    host: '/',
    dialect: 'mysql',
    pool: {
      max: 20,
      min: 0,
      idle: 5000,
    },
    logging: false,
  },
};
