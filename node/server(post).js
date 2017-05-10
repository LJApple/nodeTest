const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

var server = http.createServer(function(req,res){
	var file_name = './www'+req.url;
	// 读写文件
	fs.readFile(file_name,function(err,data){
		if(err){
			res.write('404');
		} else {
			res.write(data);
			res.end();
		}
	});
	// 获取post数据
	var str = "";
	var i = 0;
	// 分段到达
	req.on('data',function(data){
		console.log('第'+(i++)+'次');
		str += data;
	});
	// 全部都到达
	req.on('end',function(){
		var POST = querystring.parse(str);
		console.log(POST);
	});
});
server.listen('8080');
