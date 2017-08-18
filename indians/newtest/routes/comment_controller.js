const models = require('./models/models');

exports.create =(req,res)=>{
  req.accepts('application/json');
  json = req.body;

  const writerId=json.userId||'';
  const contents =json.contents|| '';
  const timestamp=json.timestamp||'';
  const title=json.title||'';
  //const song_id=req.body.songId||'';

  if (!writerId.length) {
  return res.status(400).json({error: 'Incorrect userID'});
  }

  models.Comment.create({
    memberId: writerId,
    contents: contents,
    timestamp: timestamp,
    title: title
  }).then((Comments)=>res.status(201).json({result:'true'}))
  .catch(function(e){
    console.log("fail"+e);
  })
};

exports.show=(req,res)=>{
  models.Comment.findAll({

  }).then((Comments)=>res.status(201).json(Comments))
  .catch(function(e){
    console.log("fail");
  })
};

exports.update=(req,res)=>{
  req.accepts('application/json');
  json = req.body;

  const myId=json.userId;
  const contents=json.contents;

  const newContents=json.newcontents;

   models.Comment.update(
    {
      contents:newContents
    },
     {where: {memberId: myId,
             contents: contents}
   }).then((Comments)=>req.status(201).json(Comments))
   .catch(function(e){
     console.log("fail");
   })
};

exports.destroy=(req,res)=>{
  req.accepts('application/json');
  json = req.body;

   const myId=json.myId;
   const contents=json.contents;

   models.Comment.destroy({
     where: {memberId: myId, contents: contents}
   }).then((Comments)=>req.status(201).json(Comments))
   .catch(function(e){
     console.log("fail");
   })
};

exports.replycreate=(req,res)=>{
  req.accepts('application/json');
  json = req.body;

console.log('connect');
  const commentId=json.commentId||'';
  const writerId=json.userId||'';
  const contents =json.contents|| '';
  const timestamp=json.timestamp||'';

  if (!writerId.length) {
  return res.status(400).json({error: 'Incorrect userID'});
  }

  if (!commentId.length) {
  return res.status(400).json({error: 'Incorrect userID'});
  }
console.log(commentId);

  models.Reply.create({
    commentId: commentId,
    memberId: writerId,
    contents: contents,
    timestamp: timestamp
  }).then((Replies)=>res.status(201).json({result:'true'}))
  .catch(function(e){
    console.log("fail"+e);
  })
};

exports.look=(req,res)=>{

  req.accepts('application/json');
  json = req.body;

  const commentId=json.commentId||'';


   models.Reply.findAll({
     commentId: commentId

   }).then((Replies)=>res.status(201).json(Replies))
   .catch(function(e){
     console.log("fail");
   })
};

exports.editreply=(req,res)=>{
  req.accepts('application/json');
  json = req.body;

  const myId=json.userId;
  const contents=json.contents;

  const newContents=json.newcontents;

   models.Reply.update(
    {
      contents:newContents
    },
     {where: {memberId: myId,
             contents: contents}
   }).then((Replies)=>req.status(201).json(Replies))
   .catch(function(e){
     console.log("fail");
   })
};

exports.deleteReply=(req,res)=>{
  req.accepts('application/json');
  json = req.body;

   const myId=json.myId;
   const contents=json.contents;

   models.Reply.destroy({
     where: {memberId: myId, contents: contents}
   }).then((Replies)=>req.status(201).json(Replies))
   .catch(function(e){
     console.log("fail");
   })
};
