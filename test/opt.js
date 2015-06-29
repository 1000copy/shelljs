var shell = require('..');
var expect =require('chai').expect
var assert = require("assert")
describe('1', function(){
  describe('1.1', function(){
    it('1.1.1', function(){
		var d  ="ls zoo -arbc bin a b c".split(' ')
		var argv = opt(d);
		expect(argv._).to.deep.equal("ls zoo bin a b c".split(' '))
		expect(argv.a).to.equal(true)
		expect(argv.r).to.equal(true)
		expect(argv.b).to.equal(true)
		expect(argv.c).to.equal(true)
    })
    it('1.1.2', function(){
      var d  ="ls -ard c".split(' ')
      var argv = opt(d);
        console.log(argv._)
		expect(argv._).to.deep.equal("ls c".split(' '))
		expect(argv.a).to.equal(true)
		expect(argv.r).to.equal(true)		
    })
    it('1.1.3', function(){
      var d  ="ls b c".split(' ')
      var argv = opt(d);
		expect(argv._).to.deep.equal("ls b c".split(' '))
		expect("r" in argv).to.equal(false)
    })
    it('1.1.4', function(){
      var d  ="ls b -f c".split(' ')
      var argv = opt(d);
		expect(argv._).to.deep.equal("ls b c".split(' '))
		expect("f" in argv).to.equal(true)
    })
    // optimist 可以定义boolean类型，表现的很棒
    it('1.1.5', function(){
      var d  ="ls b -f c".split(' ')
      var opt = require('optimist').parse      
      var argv = opt(d);
	 expect(argv._).to.deep.equal("ls b".split(' '))		
    })
    it('1.1.6', function(){
      var d  ="ls b -f c".split(' ')
      var opt = require('optimist').boolean("f").parse      
      var argv = opt(d);
		expect(argv._).to.deep.equal("ls b c".split(' '))
    })
     it('1.1.7', function(){
      var d  ="ls b -fg c".split(' ')
      var opt = require('optimist').boolean("f").parse      
      var argv = opt(d);
	  expect(argv._).to.deep.equal("ls b".split(' '))
	  // console.dir(argv)
    })
    it('1.1.8', function(){
      var d  ="ls b -fg c".split(' ')
      var opt = require('optimist').boolean("f").boolean("g").parse      
      var argv = opt(d);
      expect("f" in argv).to.equal(true)
      expect("g" in argv).to.equal(true)
	  expect(argv._).to.deep.equal("ls b c".split(' '))
    })
    // minimist是否可以？靠！也是可以的。我没有仔细看人家的文档
    it('1.1.9', function(){
      var d  ="ls b -fg c".split(' ')
      var opt = require('minimist')
      var argv = opt(d,{boolean:["f","g"]});
      expect("f" in argv).to.equal(true)
      expect("g" in argv).to.equal(true)
	  expect(argv._).to.deep.equal("ls b c".split(' '))
    })
    it('1.1.0', function(){
      var d  ="ls b -fg c".split(' ')
      var opt = require('minimist')
      var argv = opt(d);
      // var argv = opt(d,{boolean:["f","g"]});
      expect("f" in argv).to.equal(true)
      // expect("g" in argv).to.equal(false)
      expect(argv.g).to.equal("c")
	  expect(argv._).to.deep.equal("ls b".split(' '))
    })
    it('1.1.12', function(){
      var d  ="ls -ar r".split(' ')
      var opt = require('minimist')
      var argv = opt(d);
      // var argv = opt(d,{boolean:["f","g"]});
      console.log(argv)
      expect(argv.a).to.equal(true)
      expect(argv.r).to.equal("r")
	  expect(argv._).to.deep.equal("ls".split(' '))
    })
    it('1.1.13', function(){
      var d  ="ls -ar r".split(' ')
      var opt = require('minimist')
      var argv = opt(d);
      var argv = opt(d,{boolean:["r"]});
      console.log(argv)
      expect(argv.a).to.equal(true)
      expect(argv.r).to.equal(true)
	  expect(argv._).to.deep.equal("ls r".split(' '))
    })
    it('1.1.11', function(){
      var d  ="ls -a avalue -b bvalue arg".split(' ')
      var opt = require('minimist')
      var argv = opt(d);
      // var argv = opt(d,{boolean:["f","g"]});
      expect(argv.a).to.equal("avalue")
      expect(argv.b).to.equal("bvalue")      
      expect(argv._).to.deep.equal("ls arg".split(' '))
    })
  })
})
/*
  对于 ls -ar bin ,
  我期望的解析结果，是 -:["ls", "bin"],a:true,r:true
  minimist 给出的结果是 -:["ls"],a:true,r:bin
  这个不符合我的需要，所以，不得不改。

*/
// var d  ="ls zoo -ARBC bin a b c".split(' ')
// var d  ="ls zoo -ARBC bin".split(' ')
// var argv = opt(d);
// console.dir(argv);
function opt(args) {
    
    var flags = { bools : {}, strings : {}, unknownFn: null };    
    
    var argv = { _ : [] };

    Object.keys(flags.bools).forEach(function (key) {
        setArg(key, defaults[key] === undefined ? false : defaults[key]);
    });
    


    function argDefined(key, arg) {
        return (flags.allBools && /^--[^=]+$/.test(arg)) ||
            flags.strings[key] || flags.bools[key] || aliases[key];
    }

    function setArg (key, val, arg) {
        if (arg && flags.unknownFn && !argDefined(key, arg)) {
            if (flags.unknownFn(arg) === false) return;
        }

        var value = !flags.strings[key] && isNumber(val)
            ? Number(val) : val
        ;
        setKey(argv, key.split('.'), value);
        
    }

    function setKey (obj, keys, value) {
        var o = obj;
        keys.slice(0,-1).forEach(function (key) {
            if (o[key] === undefined) o[key] = {};
            o = o[key];
        });

        var key = keys[keys.length - 1];
        if (o[key] === undefined || flags.bools[key] || typeof o[key] === 'boolean') {
            o[key] = value;
        }
        else if (Array.isArray(o[key])) {
            o[key].push(value);
        }
        else {
            o[key] = [ o[key], value ];
        }
    }
    
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
         if (/^-[^-]+/.test(arg)) {
            var letters = arg.slice(1).split('');
            
            var broken = false;
            for (var j = 0; j < letters.length; j++) {
                var next = arg.slice(j+2);
                
                if (next === '-') {
                    setArg(letters[j], next, arg)
                    continue;
                }
                
                if (/[A-Za-z]/.test(letters[j])
                && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                    setArg(letters[j], next, arg);
                    broken = true;
                    break;
                }
                
                if (letters[j+1] && letters[j+1].match(/\W/)) {
                    setArg(letters[j], arg.slice(j+2), arg);
                    broken = true;
                    break;
                }
                else {
                    setArg(letters[j], flags.strings[letters[j]] ? '' : true, arg);
                }
            }
            
            var key = arg.slice(-1)[0];
            if (!broken && key !== '-') {
               
                if (args[i+1] && /true|false/.test(args[i+1])) {
                    setArg(key, args[i+1] === 'true', arg);
                    i++;
                }
                else {
                    setArg(key, flags.strings[key] ? '' : true, arg);
                }
            }
        }
        else {
            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
                argv._.push(
                    flags.strings['_'] || !isNumber(arg) ? arg : Number(arg)
                );
            }
            
        }
    }
    
    
    
    
    return argv;
};

function hasKey (obj, keys) {
    var o = obj;
    keys.slice(0,-1).forEach(function (key) {
        o = (o[key] || {});
    });

    var key = keys[keys.length - 1];
    return key in o;
}

function isNumber (x) {
    if (typeof x === 'number') return true;
    if (/^0x[0-9a-f]+$/i.test(x)) return true;
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
}

