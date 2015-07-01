var os = require('os');
var fs = require('fs');
var opt = require("opt-string")

var shell = require('..');
var cli = require('../src/cli.js');
var expect =require('chai').expect
var assert = require("assert")

 	  var s = opt()
      var argv = s
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

describe('opt-string', function(){
    it('1-template', function(){
      // var s = opt()
      var argv = s.parseString("ls -A . ..");
      expect(argv.A).to.equal(true)
      expect(argv.R).to.equal(false)      
      expect(argv._).to.deep.equal("ls . ..".split(' '))
    })
    it('2-newshell.ls', function(){
    	var options ={}
    	options.A =true
    	options.R =false
    	// console.log(_pwd({}))    	
    	var list = cli._ls(options,['.'])
    	var _= require("underscore")
		// 隐藏文件列出
        expect(
        		_.reject(list,function(item){return item.indexOf(".") !=0}).length >0
        	).to.deep.equal(true)      
    })
    it('3-newshell.ls', function(){
    	var options ={}
    	options.A =false
    	options.R =false
    	// console.log(_pwd({}))    	
    	var list = cli._ls(options,[])
    	var _= require("underscore")
    	// 无隐藏文件
    	console.log(list)
        expect(
        		_.reject(list,function(item){return item.indexOf(".") !=0}).length == 0
        	).to.deep.equal(true)      
    })
    it('3-notexistd', function(){
    	var options ={}
    	options.A =false
    	options.R =false
    	// console.log(_pwd({}))    	
    	try{
    		var list = cli._ls(options,["notexisteddir"])
    	}catch(e){
    		expect(e.message.length>0).to.equal(true)
    		console.log(e.message)
    	}    	
    })
    it('4-concern to shell.ls', function(){
      var argv = s.parseString("ls -AR");
      try{
      		console.log(argv)
    		var list = cli._ls(argv,argv._.slice(1))
    		console.log(list.join("	"))
    	}catch(e){
    		expect(e.message.length>0).to.equal(true)
    		console.log(e.message)
    	}    	
    })
    it('5-concern to shell.ls', function(){
      var argv = s.parseString("ls notexisteddir");
      try{
    		var list = cli._ls(argv,argv._.slice(1))
    		console.log(list.join("	"))
    	}catch(e){
    		expect(e.message.length>0).to.equal(true)
    		// console.log(e.message)
    	}    	
    })

})
