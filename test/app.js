var http =  require('http');
var greeting = require('./greeting');

var port = process.env.PORT || 5000;

http.createServer(function (req,res) {
	var content = greeting(new Date());
	res.writeHead(200,{'Content-Type': 'text-plain'});
	res.end(content+'!\n');
}).listen(port);