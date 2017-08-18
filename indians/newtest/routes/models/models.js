const config = require('../config/environment');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
   config.mariadb.database,
   config.mariadb.username,
   config.mariadb.password
);

const Member = sequelize.define('Info_members',{

  memberId: {type: Sequelize.STRING(100),  allowNull:false, primaryKey: true},
  nickName: {type: Sequelize.STRING, allowNull: false},
  password: {type: Sequelize.STRING, allowNull: false},
  age: {type: Sequelize.INTEGER, allowNull: false},
  gender: {type: Sequelize.STRING, allowNull:false},
  token: {type:Sequelize.STRING}
}
);

const Music = sequelize.define('Info_musics',{

  songId : {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  singer: Sequelize.STRING,
  title: Sequelize.STRING,
  ex: Sequelize.STRING

});

const Friend = sequelize.define('Friend_lists',{

 myId: {type: Sequelize.STRING(100), allowNull:false},
 memberId: {type: Sequelize.STRING(100), allowNull:false, reference: {model: Member,
 key: 'memberId'}},
 friendName: {type: Sequelize.STRING, allowNull: true}
}
);
Friend.removeAttribute('id');

Member.hasMany(Friend,{foreignKey:'memberId', targetKey: 'memberId'});
Friend.belongsTo(Member,{foreignKey:'memberId', targetKey: 'memberId'});

const Group = sequelize.define('Groups',{
  groupId: {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  myId: {type: Sequelize.STRING(100), allowNull: false},
  groupName: {type: Sequelize.STRING, allowNull: false},
  memberId: {type: Sequelize.STRING(100), allowNull:false, reference: {model: Member,
  key: 'memberId'}}
});

Member.hasMany(Group,{foreignKey:'memberId', targetKey: 'memberId'});
Group.belongsTo(Member,{foreignKey:'memberId', targetKey: 'memberId'});



const Comment = sequelize.define('Comments',{

  commentId : {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
  contents: Sequelize.STRING,
  timestamp: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  memberId: {type:Sequelize.STRING(100), allowNull:false, reference:{model:
  Member, key:'memberId'}},
  songId: {type:Sequelize.INTEGER, allowNull:false, reference:{model:
  Music, key:'songId'}}

});
Member.hasMany(Comment,{foreignKey:'memberId', targetKey: 'memberId'});
Comment.belongsTo(Member,{foreignKey:'memberId', targetKey: 'memberId'});
Music.hasMany(Comment, {foreignKey: 'songId', targetKey: 'songId'});
Comment.belongsTo(Music,{foreignKey:'songId', targetKey: 'songId'});

const Reply = sequelize.define('Replies',{

  replyId : {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
  commentId: {type: Sequelize.INTEGER, allowNull: false, reference:{model: Comment, key:'commentId'}},
  memberId: {type: Sequelize.STRING(100), allowNull:false, reference: {model:
  Member, key: 'memberId'}},
  contents: Sequelize.STRING,
  timestamp: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW}
});
Comment.hasMany(Reply, {foreignKey:'commentId', targetKey: 'commentId'});
Reply.belongsTo(Comment,{foreignKey: 'commentId', targetKey:'commentId'});
Member.hasMany(Reply,{foreignKey:'memberId',targetKey:'memberId'});
Reply.belongsTo(Member,{foreignKey:'memberId',targetKey:'memberId'});

const Chat = sequelize.define('Chats',{
  roomId: {type:Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
  roomName:{type: Sequelize.STRING, allowNull:false},
  myId: {type: Sequelize.STRING(100), allowNull: false},
  memberId: {type: Sequelize.STRING(100), allowNull:false, reference: {model:
  Member, key: 'memberId'}}
});
Member.hasMany(Chat,{foreignKey: 'memberId', targetKey: 'memberId'});
Chat.belongsTo(Member,{foreignKey: 'memberId', targetKey: 'memberId'});





module.exports = {
  sequelize : sequelize,
  Member: Member,
  Friend: Friend,
  Group: Group,
  Music: Music,
  Comment: Comment,
  Reply: Reply,
  Chat: Chat
}
