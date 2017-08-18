const app = require('../../app');
const port = 9000;
var io=require('socket.io').listen(port);

console.log('port');

var addedUser = false;
var numUsers = 0;
const usernames={};

io.sockets.on('connection', function (socket) {
console.log('android connect');

//room join
socket.on('join',function(data){

      // we store the username in the socket session for this client
      socket.username = data.username;
      socket.room=data.room;
      ++numUsers;
      console.log(numUsers);

      console.log('room: '+socket.room);
      console.log('username: '+socket.username);
      socket.join(data.room);
      // echo globally (all clients) that a person has connected
      socket.broadcast.to(socket.room).emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });
  });



// when the client emits 'new message', this listens and executes
socket.on('new message', function (data) {
  console.log(socket.room)
  console.log(data);


    // we tell the client to execute 'new message'
  socket.broadcast.to(socket.room).emit('new message',{
      username: socket.username,
      message: data
    });

});



// when the user disconnects.. perform this
socket.on('disconnect', function () {
  console.log('finish');


  delete usernames[socket.username];
    //if (addedUser) {
      --numUsers;
       console.log(numUsers);
      // echo globally that this client has left
      socket.broadcast.to(socket.room).emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });

      socket.leave(socket.room);
    //}
  });

});
