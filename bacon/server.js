var http = require('http');
var opt = require('opt-string')//
var shell = require('../src/cli.js')
const PORT=80; 

function handleRequest(request, response){
    
    if(request.url =="/"){
    	response.setHeader("content-type","text/html")
   			var fs = require('fs')
			var filename = "bacon/root.html";
			fs.readFile(filename, 'utf8', function(err, data) {
			  if (err) throw err;
			  response.end(data)
			});
    }
    else if (request.url.indexOf("/run")!=-1){
    	var search = getcmd(request.url)
      try{
        var r = shell.run(search)
         // response.end()
            
        // array to string
        response.end(r.toString())
      }catch(e){
        response.end(e.message)
        // console.log(e.message)
        // console.log(search)
      }
    	// console.log(request.url)
    }
    else
    	response.end('It Works!! Path Hit: ' + request.url);
}
function getcmd(url){
   var search = require('url').parse(url, true).search.slice(1)
   search = require('querystring').unescape(search)
   return search  
}
var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

// http://localhost/