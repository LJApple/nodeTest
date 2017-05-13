const express = require('express');

var server = express();

// 目录1
var routeUser = express.Router();

routeUser.get('/1.html',function(req,res){
	res.send('user1');
});
routeUser.get('/2.html',function(req,res){
	res.send('user2');
});
server.use('/user',routeUser);

// 目录2
var articleRouter = express.Router();

articleRouter.get('/1.html',function(req,res){
	res.send('article');
});
server.use('/article',articleRouter);

server.listen(8080);
