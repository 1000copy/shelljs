var shell = require('..');
var expect =require('chai').expect
var assert = require("assert")
describe('op', function(){
  describe('aaap2', function(){
  	// 多出来的选项要提示，比如b
    it('2.1.1', function(){
    	var cmd = ("ls -xyb").split(' ')
    	var rr= require('optimist')(cmd)
		var argv = rr.
			boolean(['x','y'])
			.demand("x y".split(" "))			
			.describe('x', 'Load a file')
			.describe('y', 'Save a file')
			.argv
		;
		var j = Object.keys(argv)
		console.dir(j);
		var jj = subtract(j,["_","$0"])
		console.dir(jj);
		console.dir(argv.options);
		// console.dir(argv);
		// console.dir([ argv.x, argv.y, argv.z ]);
		// console.dir(argv._);   
	}) 
  })
  it('eeee', function(){
    	var cmd = ("ls -xyb").split(' ')
    	var rr= require('optimist')(cmd)
    	var core = rr.
			boolean(['x','y'])
			.demand("x y".split(" "))			
			.describe('x', 'Load a file')
			.describe('y', 'Save a file')
		var argv = core.argv
		;
		var j = Object.keys(argv)
		// console.dir(j);
		var jj = subtract(j,["_","$0"])
		// console.dir(jj);
		// console.dir(core._options);
		// 多出来的b，需要提示给用户
		// console.dir(subtract(jj,core._options.boolean))
		expect(subtract(jj,core._options.boolean)).to.deep.equal(["b"])
		// console.dir(argv);
		// console.dir([ argv.x, argv.y, argv.z ]);
		// console.dir(argv._);   
	}) 
  
  describe('2.1', function(){
  	// 多出来的选项要提示，比如b
    it('op1', function(){
  		var a=[1,2,3]
  		var b = [3]
  		console.log(subtract(a,b))
  	})
  })
  describe('yargs', function(){  	
  	it('tarstyle', function(){
  		var yargs = require('yargs')("ls -xy".split(" "))
  		var argv = yargs.argv;
  		expect(argv.x).to.equal(true)
  		expect(argv.y).to.equal(true)		
  		expect(argv._).to.deep.equal(["ls"])		
  	})
  	it('boolean', function(){
  		var yargs = require('yargs')("ls -xy f".split(" "))
  		yargs.boolean(["x","y"])
  		var argv = yargs.argv;
  		expect(argv.x).to.equal(true)
  		expect(argv.y).to.equal(true)		
  		expect(argv._).to.deep.equal(["ls","f"])			
  	})
  	it('-y=f', function(){
  		var yargs = require('yargs')("ls -xy f".split(" "))
  		// yargs.boolean(["x","y"])
  		var argv = yargs.argv;
  		expect(argv.x).to.equal(true)
  		expect(argv.y).to.equal("f")		
  		expect(argv._).to.deep.equal(["ls"])			
  	})
  	it.skip('longquotedstring', function(){
  		var yargs = require('yargs')("ls -xy f 'long string'".split(" "))
  		// yargs.boolean(["x","y"])
  		var argv = yargs.argv;
  		expect(argv.x).to.equal(true)
  		expect(argv.y).to.equal("f")		
  		expect(argv._).to.deep.equal(["ls"])				
  	})
    it('longquotedstringbyString-argv', function(){
      var arr = parseArgsStringToArgv("-xy f \"long string\"","","ls")
      var yargs = require('yargs')(arr)
      // yargs.boolean(["x","y"])
      var argv = yargs.argv;
      expect(argv.x).to.equal(true)
      expect(argv.y).to.equal("f")    
      expect(argv._).to.deep.equal(["ls","long string"])        
    })
    it('string-argv', function(){
      var arr = parseArgsStringToArgv("ls -xyf \"long string\"")
      expect(arr).to.deep.equal(["ls","-xyf","long string"])        
    })
  	it.skip('get-help', function(){
  		var yargs = require('yargs')("ls --help".split(" "))
  		yargs.boolean(["x","y"])
  		var argv = yargs.argv;
  		// expect(yargs.help()).to.equal(true)
  		
  	})
    it('nomnom', function(){      
        var arr = parseArgsStringToArgv("-f dd -d -c \"long string\"","","ls")
        var nom = require("nomnom")
         .option('debug', {
            abbr: 'd',
            flag: true,
            help: 'Print debugging info'
         })
         .option('config', {
            abbr: 'c',
            default: 'config.json',
            help: 'JSON file with tests to run'
         })
         .option('version', {
            flag: true,
            help: 'print version and exit',
            callback: function() {
               return "version 1.2.4";
            }
         })
      var opts = nom.parse(arr);
      console.log(opts.debug)   
      console.log(opts.config)   
      if (opts.debug) {
        console.log("debug")
      }            
      
    })
    // 用不上
    it('subcommand', function(){
      // var cmd = parseArgsStringToArgv("hello","mocha",".js")
      var cmd = parseArgsStringToArgv("")
      var yargs = require('yargs')(cmd)
          .usage('$0 command')
          .command('hello', 'hello command')
          .command('world', 'world command')
          .demand(1, 'must provide a valid command'),
          argv = yargs.argv,
          command = argv._[0];

        if (command === 'hello') {
          yargs.reset()
            .usage('$0 hello')
            .help('h')
            .example('$0 hello', 'print the hello message!')
            .argv

          console.log('hello!');
        } else if (command === 'world'){
          yargs.reset()
            .usage('$0 world')
            .help('h')
            .example('$0 world', 'print the world message!')
            .argv

          console.log('world!');
        } else {
          yargs.showHelp();
        }

          })
        })
    })



    it('get-help', function(){
      var cmd = parseArgsStringToArgv("-ra bin","","ls")
      var yargs = require('yargs')(cmd)
      var argv = require('yargs')
          .usage('Usage: \nlist files.\n')
          .options({
            'r': {
              alias: 'rescure',
              demand: false,
              default: false,
              describe: 'resucre directory',
              type: 'boolean'
            }        
          })
          .options({
            'a': {
              alias: 'all',
              demand: false,
              default: false,
              describe: 'show hidden all file include hidden',
              type: 'boolean'
            }
          })
          .argv
      
      console.log(yargs.help())
    })

//  集合运算可以用undercore来解决
function subtract(a,b){
	var r =[]
	for(var i =0;i<a.length;i++){
		if (_in(a[i] , b))
			continue
		else
			r.push(a[i])
	}
	return r
}
function _in(a,b){
	var r =[]
	for(var i =0;i<b.length;i++){
		if (b[i] == a)
			return true	
	}
	return false
}

function parseArgsStringToArgv(value, env, file) {
    //[^\s'"] Match if not a space ' or "
    //+|['"] or Match ' or "
    //([^'"]*) Match anything that is not ' or "
    //['"] Close match if ' or "
    var myRegexp = /[^\s'"]+|['"]([^'"]*)['"]/gi;
    var myString = value;
    var myArray = [
    ];
    if(env){
        myArray.push(env);
    }
    if(file){
        myArray.push(file);
    }
    var match;
    do {
        //Each call to exec returns the next regex match as an array
        match = myRegexp.exec(myString);
        if (match !== null) {
            //Index 1 in the array is the captured group if it exists
            //Index 0 is the matched text, which we use if no captured group exists
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match !== null);

    return myArray;
}