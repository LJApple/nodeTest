var http = require('http');
var fs = require('fs');
var urlib = require('url');
var querystring = require('querystring');

var users = {};
var server = http.createServer(function(req,res){
	var str = "";
	req.on('data',function(data){
		str += data;
	});
	req.on('end',function(){
		// GET
		var obj = urlib.parse(req.url,true);
		var GET = obj.query;
		var portUrl = obj.pathname;
		console.log(portUrl)
		// POST
		var POST = querystring.parse(req.url);
		
		if(portUrl == '/user'){
			switch(GET.act){
				case "reg":
					if(users[GET.user]){
						res.write('{"ok":false,"msg":"用户已经注册"}');
					} else {
						users[GET.user] = GET.pass;
						res.write('{"ok":true,"msg":"注册成功"}');
					}
					break;
				case "login":
					if(users[GET.user]==null){
							res.write('{"ok":false,"msg":"用户不存在"}');
					} else if(users[GET.user] != GET.pass){
							res.write('{"ok":false,"msg":"用户或密码错误"}');
					} else {
						res.write('{"ok":true,"msg":"登录成功"}');
					}
					break;
				default:
					alert('通信错误');
			}
			res.end();
		} else {
			var file_name = "./www"+portUrl;
			console.log(file_name)
			fs.readFile(file_name,function(err,data){
				if(err){
					res.write('404');
				} else {
					res.write(data);
				}
				res.end();
			});
		}
	});
});
server.listen('8080');
