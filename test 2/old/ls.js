var shell = require('..');
var expect =require('chai').expect
var assert = require("assert")
describe('2', function(){
  describe('2.1', function(){
    it('2.1.1', function(){
      var cli = "ls -AR .."
      var d  =cli.split(' ')
      var opt = require('minimist')
      var argv = opt(d,{boolean:["A","R"]});
      expect(argv.A).to.equal(true)
      expect(argv.R).to.equal(true)      
      expect(argv._).to.deep.equal("ls ..".split(' '))
    })
    it('2.1.2', function(){
        var shell = require('..');
        var fs = require('fs');
        shell.config.silent = true;
        var result = shell.ls('-A','.'); 
        console.log(result)
    })
    it('2.1.3', function(){
        var result = parser("ls -ARFG .")
        console.log(result)
    })
    it('2.1.6', function(){
        var result = parser("ls .")
        console.log(result)
    })
    // it('2.1.4', function(){
    //     var a = {c:true,r:true }
    //     // console.log(Object.keys(a))
    //     // for (var b in Object.keys(a)){
    //     for (var b in ["c","r"]){
          
    //       console.log(b)
    //     }
    //     // console.log(result)
    // })
    // it('2.1.5', function(){
    //     for (var b in ["c","r"]){          
    //       console.log(b)//0,1
    //     }        
    //     ["c","r"].forEach(function(b){          
    //       console.log(b)//c,r
    //     })
    // })
  })
})
var shell = require('..');
shell.config.silent = true;
var dict = {}
dict.ls = {format:{boolean:["A","R"]},func:shell.ls}

function parser(cli){    
  var opt = require('minimist')
  var cmd = cli.split(' ')[0]
  var arg ="-"
  if (cmd in dict){
    var argv = opt(cli.split(' '),dict[cmd].format);
    // boolean arg handler
    var arr = Object.keys(argv)
    for(var i =0;i< arr.length;i++){
      var key = arr[i]
      if (key =="_")continue
      if (isbool(argv[key]))
        arg+= argv[key]?key:""
    }    
    console.log(arg)
    return dict[cmd].func(arg,argv._.slice(1))    
  }
}
function isbool(o){
  return Object.prototype.toString.call(o) ==='[object Boolean]'
}
