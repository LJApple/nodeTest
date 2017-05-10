const fs = require('fs');

fs.readFile('aaa.txt',function(err,data){
	console.log(data.toString())
});
