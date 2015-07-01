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
            var s = opt()
            s
                  .usage("a headline usage text")
                  .demand(1)
                  .options('A', {
                      type:"boolean",
                      describe:"all include hidden",
                      default:false
                  })
                  .options('R', {
                      type:"boolean"
                      ,describe:"recursive to sub dir"
                      ,default:false
                  })
           var argv = s.parseString(search)
        console.log(argv)   
          var r = shell._ls(argv);
        // array to string
        response.end(r.toString())
      }catch(e){
        response.end(e.message)
        console.log(e.message)
        console.log(search)
      }
    	console.log(request.url)
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