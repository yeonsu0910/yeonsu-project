const config = require('../config/environment');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
   config.mariadb.database,
   config.mariadb.username,
   config.mariadb.password
)

const Comment = sequelize.define('Comment',{

  contents : Sequelize.STRING,
  timestamp:  Sequelize.DATE,
  writer_id: {type:Sequelize.INTEGER, allowNull:false, reference:{model:
  models.Member, key:'id'}},
  song_id: {type:Sequelize.INTEGER, allowNull:false, reference:{model:
  models.Member, key:'id'}}

}
);



module.exports = {
  sequelize : sequelize,
  Member: Friend
}
