var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var https = require('https');
var fs = require('fs');
var bootstrap = require("./api/v1/middlewares/bootstrap");
var error = require("./api/v1/middlewares/error");
var indexRouter = require('./api/v1/routes/index');

var app = express();

bootstrap(app);
app.use(cookieParser());
app.use(session({
	key: '69Atu22GZTSyDGW4sf4mMJdJ42436gAs',
	secret: '3dCE84rey8R8pHKrVRedgyEjhrqGT5Hz',
	resave: false,
	saveUninitialized: false
}));

app.use('/', indexRouter);
error(app);

//socket server

var ip = require("ip").address();
var port = 5354;
var key = fs.readFileSync('./config/encryption/domain.key');
var cert = fs.readFileSync('./config/encryption/domain.crt');
var server = https.createServer({
	key: key,
	cert: cert
}, app);

//code start notification

//var redis = require('socket.io-redis');
var io = require('socket.io')(server);
// io.adapter(redis({
// 	host: 'localhost',
// 	port: 6379
// }));

server.listen(port, ip, function () {
	console.log('app is running at : https://' + ip + ":" + port);
});


io.sockets.on("connection", function (socket) {
	console.log("connected, count : ", io.engine.clientsCount);
	socket.emit('connected', {
		connected: true,
		socketId: socket.id
	});
    active(io);
    socket.on("send",function(data){
        socket.broadcast.emit("msg",data);
    });
	socket.on("join",function(data){
		console.log("join");
		socket.join(data);
		active(io);
	});
	socket.on("leave",function(data){
		console.log("leave");
		socket.leave(data);
		active(io);	
	});
	socket.on("disconnect", function () {
		console.log("disconnected, count : ", io.engine.clientsCount);
		active(io);
	});
});
function active(xio){
	xio.in("online").clients((err , clients) => {
		if(err){
		console.log(err);
	}else{
		 xio.emit("active-user", xio.engine.clientsCount);
		 console.log("online : "+xio.engine.clientsCount);
	}
});
}
///end notification