//  test
var assert = require("assert")
assert.equal (true,1)

// code

var http = require("http");
get(function(str){
	assert("hello World",str)
	 process.exit()}
)

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(80);

function get(callback){
	http.request({
	  host: 'localhost',
	  path: '/'
	}, function(response) {
	  var str = '';
	  response.on('data', function (chunk) {
	    str += chunk;
	  });
	  response.on('end', function () {
	  	callback(str)	    
	  });
	}
	).end();
}
// var options = {
//   host: 'www.nodejitsu.com',
//   path: '/',
//   port: '1338',
//   //This is the only line that is new. `headers` is an object with the headers to request
//   headers: {'custom': 'Custom Header Demo works'}
// };