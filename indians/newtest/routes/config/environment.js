const environments={
  development: {

  mariadb:{
    username:'root',
    password: '1011',
    database: 'api_dev'
  }
},

test:{
  mariadb:{
    username: 'root',
    password: '1011',
    database: 'api_test'
  }
},
  production: {

  }
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports =environments[nodeEnv];
