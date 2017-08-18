var net = require('net');
var fs=require('fs');
var dgram=require('dgram');
var wstream=fs.createWriteStream('tmp.bin');


var client = new net.Socket();
client.connect(port, ip,function(){
  console.log('Connected');
  client.write('Hello Server, Client');
});

client.on('listening', function(){
  var address=
  client.setBroadcast(true);
  client.setMulticastTTL(128);
  client.addMembership(ip)''
})

client.on('data',function(data){
  console.log('Received: '+data);
  wstream.write(data);
  wstream.end();
  client.destroy();
});

client.on('sendto',function(){
  client.send(wstream,0,wstream.length,PORT,HOST,function(err){
    if(err)throw err;
    else {
      client.in(room).broadcast.emit(wstream);
    }
  })
})




client.on('close',function(){
  console.log('Connection closed');
});
