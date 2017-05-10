const http = require('http');
const fs = require('fs');

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
	console.log(request.url);
	var GET = {};
	if(request.url.indexOf('?')!= -1){
		var arr = request.url.split('?');
		var url = arr[0];
		var arr2 = arr[1].split('&');
		for (var i = 0;i<arr2.length;i++) {
			var arr3 = arr2[i].split('=');
			GET[arr3[0]] = arr3[1];
		}
	} else {
		var url = request.url;
	}
	console.log(url,GET);
});

server.listen(8080);

console.log('http://127.0.0.1:8888')