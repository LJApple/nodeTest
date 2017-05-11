const express = require('express');
const expressStatic = require('express-static');

var server = express();

server.listen(8080);

var users = {
	
};

server.get('/login',function(req,res){

	var user = req.query['user'];
	var pass = req.query['pass'];
	console.log(user);
	if(users[user]==null){
		res.send({ok:false,msg:'用户不存在1'});
	} else {
		if(users[user]!= pass){
			res.send({ok:false,msg:'密码不正确'});
		} else {
			res.send({ok:true,msg:'登录成功'});
		}
	}
});
server.get('/Register',function(req,res){
	var user = req.query['user'];
	var pass = req.query['pass'];
	console.log(user+":"+pass);
	if(users[user]==user){
		res.send({ok:false,msg:'该用户已经存在'});
		console.log(users);
	}else if(user==""  || pass == ""){
		res.send({ok:false,msg:'用户名密码不能为空'});
	} else{
		users[user] = pass;
		res.send({ok:true,msg:'注册成功'});
		console.log(users);
	}
});
server.use(expressStatic('./www'));

