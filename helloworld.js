var http = require('http');

http.createServer(function (request,response){
response.writeHead(200,{'Content-Type':
'text/plain'});
response.end('Hello World!n');
}).listen(8000,'172.16.61.155');

console.log('Server running at http://172.16.61.155/');
