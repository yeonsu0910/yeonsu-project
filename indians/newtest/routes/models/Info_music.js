const config = require('../config/environment');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
   config.mariadb.database,
   config.mariadb.username,
   config.mariadb.password
)

const
