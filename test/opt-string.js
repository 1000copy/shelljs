var os = require('os');
var fs = require('fs');
var opt = require("opt-string")

var shell = require('..');
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
    	var list = _ls(options,['.'])
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
    	var list = _ls(options,[])
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
    		var list = _ls(options,["notexisteddir"])
    	}catch(e){
    		expect(e.message.length>0).to.equal(true)
    		console.log(e.message)
    	}    	
    })
    it('4-concern to shell.ls', function(){
      var argv = s.parseString("ls -AR");
      try{
      		console.log(argv)
    		var list = _ls(argv,argv._.slice(1))
    		console.log(list.join("	"))
    	}catch(e){
    		expect(e.message.length>0).to.equal(true)
    		console.log(e.message)
    	}    	
    })
    it('5-concern to shell.ls', function(){
      var argv = s.parseString("ls notexisteddir");
      try{
    		var list = _ls(argv,argv._.slice(1))
    		console.log(list.join("	"))
    	}catch(e){
    		expect(e.message.length>0).to.equal(true)
    		// console.log(e.message)
    	}    	
    })

})
function platform(){
	return os.type().match(/^Win/) ? 'win' : 'unix';
}

function _ls(options, paths) {
  options.recursive = options.R
  options.all = options.A
  delete options.A
  delete options.R
  if (!paths || paths.length == 0)
    paths = ['.'];
  else if (typeof paths === 'object')
    paths = paths; // assume array
  else if (typeof paths === 'string')
    paths = [].slice.call(arguments, 1);

  var list = [];

  // Conditionally pushes file to list - returns true if pushed, false otherwise
  // (e.g. prevents hidden files to be included unless explicitly told so)
  function pushFile(file, query) {
    // hidden file?
    if (path.basename(file)[0] === '.') {
      // not explicitly asking for hidden files?
      if (!options.all && !(path.basename(query)[0] === '.' && path.basename(query).length > 1))
        return false;
    }

    if (platform() === 'win')
      file = file.replace(/\\/g, '/');

    list.push(file);
    return true;
  }

  paths.forEach(function(p) {
    if (fs.existsSync(p)) {
      var stats = fs.statSync(p);
      // Simple file?
      if (stats.isFile()) {
        pushFile(p, p);
        return; // continue
      }

      // Simple dir?
      if (stats.isDirectory()) {
        // Iterate over p contents
        fs.readdirSync(p).forEach(function(file) {
          if (!pushFile(file, p))
            return;

          // Recursive?
          if (options.recursive) {
            var oldDir = _pwd();
            _cd('', p);
            if (fs.statSync(file).isDirectory())
              list = list.concat(_ls('-R'+(options.all?'A':''), file+'/*'));
            _cd('', oldDir);
          }
        });
        return; // continue
      }
    }

    // p does not exist - possible wildcard present

    var basename = path.basename(p);
    var dirname = path.dirname(p);
    // Wildcard present on an existing dir? (e.g. '/tmp/*.js')
    if (basename.search(/\*/) > -1 && fs.existsSync(dirname) && fs.statSync(dirname).isDirectory) {
      // Escape special regular expression chars
      var regexp = basename.replace(/(\^|\$|\(|\)|<|>|\[|\]|\{|\}|\.|\+|\?)/g, '\\$1');
      // Translates wildcard into regex
      regexp = '^' + regexp.replace(/\*/g, '.*') + '$';
      // Iterate over directory contents
      fs.readdirSync(dirname).forEach(function(file) {
        if (file.match(new RegExp(regexp))) {
          if (!pushFile(path.normalize(dirname+'/'+file), basename))
            return;

          // Recursive?
          if (options.recursive) {
            var pp = dirname + '/' + file;
            if (fs.lstatSync(pp).isDirectory())
              list = list.concat(_ls('-R'+(options.all?'A':''), pp+'/*'));
          } // recursive
        } // if file matches
      }); // forEach
      return;
    }

    throw new Error('no such file or directory: ' + p)//common.error('no such file or directory: ' + p, true);
  });

  return list;
}

var path = require('path');

function _pwd(options) {
  var pwd = path.resolve(process.cwd());
  return pwd;
}
function _cd(options, dir) {
  if (!dir)
    throw new Error('directory not specified');

  if (!fs.existsSync(dir))
    throw new Error('no such file or directory: ' + dir);

  if (!fs.statSync(dir).isDirectory())
    throw new Error('not a directory: ' + dir);

  process.chdir(dir);
}