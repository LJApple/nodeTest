const http = require('http');
const fs = require('fs');
const urlLib = require('url');
var server = http.createServer(function(request,response){
	var file_name = './www' + request.url;
	// 读取文件
	fs.readFile(file_name,function(err,data){
		if(err) {
			response.write('404');
		} else {
			response.write(data);
			response.end();
		}	
	});
	
	// 接受请求
	console.log(request.url)
	var obj = urlLib.parse(request.url,true);
	var url = obj.pathname;
	var GET = obj.query;
	console.log(url,GET);
});

server.listen(8080);

console.log('http://127.0.0.1:8888')