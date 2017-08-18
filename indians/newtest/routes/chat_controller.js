const app = require('../app');
var io=require('socket.io').listen();
const models = require('./models/models');
var request=require('request');


var FCM = require('fcm-push');

var serverKey='AAAAE1pbrCU:APA91bFRiHkMkRWRJDj3Xi3wFyYD9QTEhepr7Teiu5dL8qq4DPdd5Nd5TWTx7NzpAMRqXMTFr8Gr81NLnz1lw2FXDY23NB_VI-C2WUuONXSIqNYOxCgFp0R1U1Vr2E--vgp3hKrbtjJsktlp07pNS0uH4stklU4Yzw';
var fcm=new FCM(serverKey);


exports.create=(req,res)=>{

  req.accepts('application/json');
  json = req.body;

  for(var i=0;i<jsons['room'].length;i++){
     serializeRoom = JSON.stringify(jsons['room'][i]);
     console.log("serializeRoom = " + serializeGroup);
     models.Chat.create({
       myId: jsons['room'][i]['userId'],
       roomName: jsons['room'][i]['roomName'],
       memberId: jsons['group'][i]['friendId']
     }).then((Chats)=>res.status(201).json({result: 'true'}))
     .catch(function(e){
      console.log("fail : " + e);
    })
  }

};

exports.delete=(req,res)=>{
  req.accepts('application/json');
  json = req.body;

   const myId=json.myId;
   const roomName=json.roomname;

   models.Chat.destroy({
     where: {myId: myId, roomName: roomName}
   }).then((Chats)=>req.status(201).json(Chats))
   .catch(function(e){
     console.log("fail");
   })
};

exports.push=(req,res)=>{
  req.accepts('application/json');
  json = req.body;

   const myId=json.userId;
   const userId=json.friendId;

  models.Member.findAll({
    where: {
      memberId:userId
    },
    attributes: ['token']

  }).then(function(tokens){
    var message={
      uri: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Authorization': 'AIzaSyAi2Cpips-T3PjnZhtgEIGP6xJaXyZnmWc'
      },
      'registration_ids': tokens.map(token => token.token ),
      'data':
      {
        'title':'title',
        'message1':''+myId,
        'message2':''+userId
      }

    };
fcm.send(message,function(err,response){
  if(err){
    console.log("Something has gone wrong"+err);
  }else{
    console.log("Successfully sent with response: "+response);
  }
});

return res.json({result: 'true'});

  });


};

exports.group=(req,res)=>{
  req.accepts('application/json');
  json = req.body;

   const myId=json.userId;
  const groupName=json.name;

  console.log(groupName);

  models.Member.findAll({
    attributes: ['token','memberId'],

      include: {
      model: models.Group,
      where: {myId: myId, groupName: groupName},
      attributes :[]
    }

  })
  .then(function(users){

  console.log(users.map(token=>token.token));



    var message={
      uri: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Authorization': 'AIzaSyAi2Cpips-T3PjnZhtgEIGP6xJaXyZnmWc'
      },
      'registration_ids': users.map(token => token.token ),
      'data':
      {
        'title':'title',
        'message1':''+groupName,
        'message2':''+myId
      }

    };
fcm.send(message,function(err,response){
  if(err){
    console.log("Something has gone wrong"+err);
  }else{
    console.log("Successfully sent with response: "+response);
  }
});

return res.json({result: 'true'});

  });


};
