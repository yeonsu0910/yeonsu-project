const models = require('./models/models');

//search friends
exports.search=(req,res)=>{
  req.accepts('application/json');
  json = req.body;

   const friendId=json.friendId||'';

    if (!friendId.length) {
    return res.status(400).json({error: 'Incorrect userId'});
    }
    console.log(friendId);

  models.Member.findOne(
    {
      where: {memberId: friendId}
    }
  ).then(function(Info_members){
    return res.json(Info_members);
  }).catch(function(e){
    console.log("fail");
  })
};

//add users' friends
exports.create =(req,res)=>{
  req.accepts('application/json');
  json = req.body;

  const myId=json.userId||'';
  const friendId=json.friendId||'';
  const nickname=json.name||'';

  if (!myId.length) {
  return res.status(400).json({error: 'Incorrect userId'});
  }

  if (!friendId.length) {
  return res.status(400).json({error: 'Incorrect userId'});
  }

  models.Friend.create({
    myId: myId,
    memberId: friendId,
    friendName: nickname
  }).then((Friend_lists)=>res.status(201).json({result:'true'})
   ).catch(function(e){
     console.log("fail");
   })
};

//show friends
exports.show = (req,res)=>{
  req.accepts('application/json');
  json = req.body;

  const myId=json.userId||'';


  models.Friend.findAll({
    where: {myId: myId},
    include: {model: models.Member, attributes: ['nickName']}
  }).then((Friend_lists)=>res.json(Friend_lists))
  .catch(function(e){
    console.log("fail"+e);
  })
};

//friends' nickname edit
exports.edit = (req,res) =>{

  req.accepts('application/json');
  json = req.body;

  const myId=json.userId||'';
  const newName=json.name||'';

  if(!newName.length)
  {
      return res.status(400).json({error: 'Incorrect Nickname'});
  }

  models.Friend.update(
    {
      friendName: newName
  },

   {
     where: {memberId: myId}
   }).then((Friend_lists)=>res.json(Friend_lists))
   .catch(function(e){
     console.log("fail");
   })
};

exports.destroy = (req,res) =>{
  const myId=req.parmas.userId;
  const friendId=req.params.friendId;

  if (!friendId.length) {
    return res.status(400).json({error: 'Incorrect Nickname'});
  }

  models.Friend.destroy({
    where: {
      myId: myId,
      memberId: memberId
    }
  }).then((Friend_lists)=>res.status(204).send({result: true}))
  .catch(function(e){
    console.log("fail");
  })
};
