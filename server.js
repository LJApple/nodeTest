const experss = require('express');

var server = experss();

server.use('/a.html',function(req,res){
	res.send('abd');
});
server.listen(8080);
