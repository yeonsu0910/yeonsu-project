
//imports modules(middleware)
var express   = require('express'),
      http    = require('http'),
      app     = express(),
      path    = require('path'),
 bodyParser   = require('body-parser'),
 cookieParser = require('cookie-parser'),
     passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
      session = require('express-session');
var flash= require('connect-flash');
//var async = require('async');
var crypto = require('crypto');
var member = require('./routes/member_api');
var comment= require('./routes/comment_api');
var friend=require('./routes/friend_list_api');
var group=require('./routes/group_api');
var models = require('./routes/models/models');
var chat=require('./routes/chat_api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//body-parser for retrieving form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(flash());

app.use(session({
  secret:'MySecret'
//  store: new redisStore({host:'52.78.113.75',port: 3000, client: client}),
  //saveUnintialized: false,
  //resave: false
}));


app.get('/', (req, res) => {
  res.send('Hello World!\n');
 });


 app.post('/', function( req, res){

   res.writeHead(200,{"Content-Type" : "text/plain"});
   //post데이터확인
  console.log(req.body);
  res.end('test');
 });
 //http.createServer(app).listen(3000);
app.use('/members', member);
app.use('/comments',comment);
app.use('/friends',friend);
app.use('/groups',group);
app.use('/chats',chat);



module.exports=app;
//app.listen(3000, () => {
//  console.log('Example app listening on port 3000!');

//  require('./routes/member_models').sequelize.sync({force: true})
//  .then(()=>{
//    console.log("Database sync");
  //});
//});
