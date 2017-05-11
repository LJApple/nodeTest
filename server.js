const experss = require('express');

var server = experss();

server.use('/a.html',function(req,res){
	res.send({a:12,b:5});
	res.end();
});
server.listen(8080);
