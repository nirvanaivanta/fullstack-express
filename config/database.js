const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('marketplace', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

module.exports = sequelize;
