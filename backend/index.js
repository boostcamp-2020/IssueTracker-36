const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const app = express();
const dev = process.env.NODE_ENV === 'development';

require('dotenv').config();

if (dev) {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
require('./routes')(app);

module.exports = app;
