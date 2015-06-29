var shell = require('..');
var expect =require('chai').expect
var assert = require("assert")
describe('1', function(){
  describe('1.1', function(){
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
      // console.log(argv)
      expect(argv.a).to.equal(true)
      expect(argv.r).to.equal("r")
	  expect(argv._).to.deep.equal("ls".split(' '))
    })
    it('1.1.13', function(){
      var d  ="ls -ar r".split(' ')
      var opt = require('minimist')
      var argv = opt(d);
      var argv = opt(d,{boolean:["r"]});
      // console.log(argv)
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
