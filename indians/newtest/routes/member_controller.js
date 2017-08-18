const models = require('./models/models');
var crypto = require('crypto');

//AES encryption function
function encrypt(text){
  var cipher = crypto.createCipher('aes256','myKey');
  cipher.update(text,'ascii','hex');
  var ciphered=cipher.final('hex');
  return ciphered;
}

//login
exports.login = (req,res,next) =>{

  req.accepts('application/json');
  json = req.body;

  //input id& password
  const userId=json.userId||'';
  const password =json.password||'';
  const newToken = json.token||'';

  if (!userId.length) {
   return res.status(400).json({error: 'Incorrenct userId'});
   }
  if (!password.length) {
  return res.status(400).json({error: 'Incorrenct password'});
  }

const ciphered=encrypt(password);

models.Member.update({

    token: newToken
  },
  {
    where: {memberId: userId,
            password: ciphered
          }
  }
).then(Info_members =>{
if(!Info_members){
 return res.status(404).json({result: 'false'});
 }
 else{
  return res.json({result: 'true'});
 }
});
};

// signup
exports.create =(req,res)=>{
  req.accepts('application/json');
  json = req.body;

  //input id, nickname, password, age, gender
  const userId =json.userId || '';
  const name = json.name || '';
  const password = json.password || '';
  const age = json.age || '';
  const gender =json.gender || '';
  const token = json.token || '';

  const ciphered = encrypt(password);

  if (!userId.length) {
  return res.status(400).json({error: 'Incorrect userId'});
  }
  else if (!name.length) {
  return res.status(400).json({error: 'Incorrect Nickname'});
  }
  else if (!password.length) {
  return res.status(400).json({error: 'Incorrect Password'});
 }
  else if (!age.length) {
  return res.status(400).json({error: 'Incorrect Age'});
  }
   else if (!gender.length) {
     return res.status(400).json({error: 'Incorrect Gender'});
}


models.Member.create({
 memberId: userId,
 nickName: name,
 password: ciphered,
 age: age,
 gender: gender,
 token: token
}).then((Info_members)=>res.status(201).json({result:'true'}))
   .catch(function(e){
    console.log("fail");
})
};


//check Id
exports.checkId =(req,res)=>{


  req.accepts('application/json');
  json = req.body;

  //input id
  const userId = json.userId|| '';

  if (!userId.length) {
    return res.status(400).json({error: 'Incorrect userId'});
  }

  models.Member.findOne({
    where:{
      memberId: userId
    }
  }).then(Info_members=>{
    if (!Info_members) {
        return res.json({result: 'true'});
    }

    return res.status(404).json({result: 'false'});
  });
};

//checkName
exports.checkName =(req,res)=>{

  req.accepts('application/json');
  json = req.body;

  //input nickname
  const name = json.name|| '';

  if (!name.length) {
    return res.status(400).json({error: 'Incorrect Nickname'});
  }

  models.Member.findOne({
    where:{
      nickName: name
    }
  }).then(Info_members=>{
    if (!Info_members) {
        return res.json({result: 'true'});
    }

    return res.json({result: 'false'});
  });
};

//edit Member
exports.update = (req,res)=>{

  req.accepts('application/json');
  json = req.body;

  //input id
  const userId = json.userId;

  //input nickname, password
  const newName = json.name;
  const newPassword = json.password;

  if (!newName.length) {
    return res.status(400).json({error: 'Incorrect Nickname'});
  }

  if (!newPassword.length) {
    return res.status(400).json({error: 'Incorrect Password'});
  }

  const newCiphered = encrypt(newPassword);

  models.Member.update(

    {
      nickName: newName,
      password: newCiphered
    },
    {
      where: {memberId: userId}
    }
  ).then(function(Info_members){

      return res.json({result: 'true'});

  }).catch(function(e){
    console.log("fail");
  })
};

//회원 탈퇴
exports.destroy = (req,res)=>{

  req.accepts('application/json');
  json = req.body;

  //input id, password
  const userId=json.userId;
  const password=json.password;

  if (!userId.length) {
    return res.status(400).json({error: 'Incorrect Nickname'});
  }

  if (!password.length) {
    return res.status(400).json({error: 'Incorrect Password'});
  }

  const ciphered=encrypt(password);

  models.Member.destroy({
    where: {
      memberId: userId,
      password: ciphered
    }
  }).then((Info_members)=>res.status(204).json({result: true}))
  .catch(function(e){
    console.log("fail");
  })
};
