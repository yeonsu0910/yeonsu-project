const models = require('./models/models');

exports.create=(req,res)=>{

  req.accepts('application/json');
  jsons = req.body;
  //console.log("JSON.stringfy(jsons['group']) = " + JSON.stringify(jsons['group']));

for(var i=0;i<jsons['group'].length;i++){
   serializeGroup = JSON.stringify(jsons['group'][i]);
   console.log("serializeGroup = " + serializeGroup);
   models.Group.create({
     myId: jsons['group'][i]['userId'],
     groupName: jsons['group'][i]['groupName'],
     memberId: jsons['group'][i]['friendId']
   }).then((Groups)=>res.status(201).json({result:'true'}))
   .catch(function(e){
    console.log("fail : " + e);
  })
}
};

exports.showgroup =(req,res)=>{

  req.accepts('application/json');
  json = req.body;

  const myId=json.userId;

  models.Group.findAll({
    where: {myId: myId},
    group: ['groupName']
  }).then((Groups)=>res.status(201).json(Groups))
  .catch(function(e){
   console.log("fail"+ e);
})
};

exports.look =(req,res)=>{
  req.accepts('application/json');
  json = req.body;

  const myId=json.userId;
  const groupName=json.groupName;

  models.Group.findAll({
    where: {myId: myId,
            groupName: groupName
          }
  }).then((Groups)=>res.status(201).json(Groups))
  .catch(function(e){
   console.log("fail");
})
};


exports.update=(req,res)=>{

  req.accepts('application/json');
  json = req.body;

  const myId=json.userId;
  const groupName=json.groupName;
  const newName = json.newName;

  if (!newName.length) {
    return res.status(400).json({error: 'Incorrect Nickname'});
  }


  models.Group.update(
    {
      groupName: newName
    },
    {where: {myId: myId ,
           groupName: groupName
         }
  }).then((Groups)=>res.status(201).json(Groups))
  .catch(function(e){
   console.log("fail");
})
};

exports.destroyFriends=(req,res)=>{

  req.accepts('application/json');
  json = req.body;


  const myId= json.userId;
  const groupName=json.groupName;
  const friendId=json.friendId;

  models.Group.destroy({
    where: {myId:myId,
            groupName: groupName,
            memberId: friendId
          }
  }).then((Groups)=>res.status(201).json(Groups))
  .catch(function(e){
   console.log("fail");
})
};

exports.destroy=(req,res)=>{

  req.accepts('application/json');
  json = req.body;

  const myId= json.userId;
  const groupName=json.groupName;

  models.Group.destroy({
    where: {myId: myId,
            groupName: groupName}
  }).then((Groups)=>res.status(201).json(Groups))
  .catch(function(e){
   console.log("fail");
})
};
