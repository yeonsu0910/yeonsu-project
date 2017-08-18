var fs=require('fs'),udp=require('dgram'), Buffer=require('buffer').Buffer,
RtpPacket = require('../lib/rtppacket').RtpPacket,
fd,sock,rtp, intvl, buf, bytesReadm ip, port,


writeData = function(data){
  if((bytesRead=fs.readSync(fd,buf,0,buf.length))>0){
    if(!rtp)
    {
    rtp=new RtpPacket(buf);
    }
    else {
      rtp.payload=buf;
    }
    rtp.time+=buf.length;
    rtp.seq++;
    if(!sock)
     sock=udp.createSocket('udp4');
    sock.in(data.room).broadcast.send(rtp.packet,0,rtp,packet.length, port,ip);
  }else{
    if(intvl)
      clearInterval(intvl);
    fs.closeSync(fd);
    if(sock)
    sock.close();
  }
};

ip=
port=
buf=new Buffer(100);
fd=fs.openSync("","r");
intvl = setInterval(writeData, 20);
