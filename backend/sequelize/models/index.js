require('dotenv').config();

const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize
//   .sync({
//     // force: true
//   })
//   .then(() => {
//     console.log(' Sync 성공');
//     console.log(' \n\n');
//   })
//   .catch((err) => {
//     console.log(' Sync 실패');
//     console.error(err);
//     console.log(' \n\n');
//     process.exit();
//   });

module.exports = db;
