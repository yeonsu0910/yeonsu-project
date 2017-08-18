var PORT=;
var HOST='localhost';
var dgram=require('dgram');
var server=dgram.createSocket('udp4');
var fs=require('fs');
var log=require('sys').log;
var wstream=fs.createWriteStream('tmp.bin');


wstream.on('finish',function(){
  console.log('file has been writing');
});

server.on('message',function(message,remote){
  wstream.write(message);
  wstream.end();
});

server.bind(PORT,HOST);

server.on('sendto',function(){
  server.send(wstream,0,wstream.length,PORT,HOST,function(err){
    if(err)throw err;
    else {
      server.in(room).broadcast.emit(wstream);
    }
  })
})
