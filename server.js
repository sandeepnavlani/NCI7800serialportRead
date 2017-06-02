var SerialPort = require("serialport");
var events =  require("events").EventEmitter;
var express =  require("express");
var app = express();
var http = require("http").Server(app);
var require("socket.io").(http);
var portName ="COM1";

var myParser = function (emitter,buffer){
emitter.emit("data",buffer);
}

var serPort = new SerialPort(portName,{
             parser:myParser,
			 baudRate: 9600,
			 databits: 7,
			 stopBits:1,
			 parity:'even',
			 bufferSize:65536
});


console.log(serPort);

serPort.on('open',function(err){
	if(err){
		console.log("Port open error:",err);
	}else{
		console.log("Port opened!");
	}
	
});

serPort.on("data",function(data){
io.sockets.on('connection',function(socket){
	console.log(data.toString("utf8",3));
	socket.emit('data',data.toString("utf8",3));
});	
	
});

setInterval( function(){
	serPort.write("W\r");
},1000);

http.listen(3000,function(){
	console.log('listening on *:3000');
});

app.get('/',function(req,res){
res.sendFile(_dirname+'/index.html');	
});