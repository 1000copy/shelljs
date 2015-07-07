	var m = [
	    {path:"/",func:function(request, response){console.log("foo")}},
	    {path:"/start",func:function(request, response){console.log("bar")}},
	    {path:"/upload",func:function(request, response){console.log("baz")}}
	  ]
    
    var url = require("url")
    var http = require("http");
    http.createServer(function(request, response) {
      var pathname = url.parse(request.url).pathname;
      route(pathname)(request,response);
      response.end("<b>it works</b><a href='/start'>start</a>");
    }).listen(80);
    function route(pathname){
      console.log(pathname)
      for(var i=0;i<m.length;i++)
        if (m[i].path == pathname)
          return m.func
      // return null
      // return m[0].func;
    }
    