const http = require('http');
const querystring = require('querystring');
const urlbin = require('url');
const fs = require('fs');

var users = {};
var server = http.createServer(function(req,res){
	var str = "";
	req.on('data',function(data){
		str += data;
	});
	req.on('end',function(){
		var obj = urlbin.parse(req.url,true);
		var GET = obj.query;
		var urlPort = obj.pathname;
		var POST = querystring.parse(req.url);
		console.log(urlPort);
		// 区分接口
		if(urlPort=='/user'){
			switch(GET.act){
				case 'reg':
					// 判断用户名是否已经存在
					if(users[GET.user]){
						res.write('{"ok":false,"msg":"此用户已经存在"}');
					} else {
						// 插入users
						users[GET.user] = GET.pass;
						res.write('{"ok":true,"msg":"success"}');
					}
					break;
				case 'login':
					// 检查用户是否存在
					if(users[GET.user]==null){
						res.write('{"ok":false,"msg":"此用户不存在"}');
					} else if(users[GET.user]!=GET.pass){
						// 检查用户密码
						res.write('{"ok":false,"msg":"用户名或密码错误"}')
					} else {
						res.write('{"ok":false,"msg":"登录成功"}');
					}
					break;
				default:
					res.write('{"ok":"false","msg":"位置的act"}');
			}
			res.end();
		}else{
			// 读取文件
			var file_name = './www'+urlPort;
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
