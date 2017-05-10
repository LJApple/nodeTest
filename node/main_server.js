const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

var server = http.createServer(function(req,res){
	// 读取文件
	var file_name = './www'+req.url;
	fs.readFile(file_name,function(err,data){
		if(err){
			res.write('404');
		} else {
			res.write(data);
		
		}
	});
	// get请求
	var postList = urlLib.parse(req.url,true);
	var POST = postList.query;
	var path = postList.pathname;
	console.log(path,POST);
	
	// post请求
	var str = "";
	req.on('data',function(data){
		str += data
	});
	req.on('end',function(){
		str = querystring.parse(str);
		console.log(str);
	});
	res.end();
});
server.listen('8080');
