
const config = require('../config/environment');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
   config.mariadb.database,
   config.mariadb.username,
   config.mariadb.password
)

const Member = sequelize.define('Info_members',{
  userId: Sequelize.STRING,
  nickName : Sequelize.STRING,
  password: Sequelize.STRING,
  age: Sequelize.INTEGER,
  gender: Sequelize.STRING,
  token: Sequelize.STRING
});

module.exports = {
  sequelize : sequelize,
  Member: Member
}
