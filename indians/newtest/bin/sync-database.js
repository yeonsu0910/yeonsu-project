const models=require('../routes/models/models');

module.exports =()=>{
  return models.sequelize.sync({force: true});
};
