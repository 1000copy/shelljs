/*
  examples-test.js: Test to run all the examples

  Copyright (c) Nodejitsu 2013

*/
var expect = require('chai').expect
var cli = require("../src/cli.js")
var d = require("../src/dispatcher.js")
var common = require("../src/common.js")

describe.skip('template1', function () {
  describe('1.1', function () {    
    it('should have ..', function (done) {
      done()
    })
  })
})

describe('cli', function () {
  d.run("mkdir -p ./data")    
  it('rm argument length must be fill', function (done) {
    var f = function(){d.run("rm")}
    var g = d.run.bind(this,"rm")
    // f()
    // f()
    // expect(f).to.throw(/no paths given/)
    expect(f).to.throw(common.ArgumentLengthError)
    expect(g).to.throw(common.ArgumentLengthError)
    done()
  })
  it('touch', function (done) {
    d.run("touch ./data/new.js")
    d.run("rm ./data/new.js")    
    done()  
  })
  it('mkdir', function (done) {
    d.run("mkdir -p ./data/new/york")    
    d.run("rm -R ./data/new")// 删除目录需要加上-R    
    done()  
  })
  it('mv', function (done) {
    d.run("touch ./data/new.js")
    d.run("mv -f ./data/new.js ./data/new1.js")    
    d.run("rm ./data/new1.js")

    done()  
  })
})

describe('cli', function () {
  it('should have ..', function (done) {
    var err = new ReferenceError('This is a bad function.');
    var fn = function () { throw err; }
    expect(fn).to.throw(ReferenceError);
    expect(fn).to.throw(Error);
    expect(fn).to.throw(/bad function/);
    expect(fn).to.not.throw('good function');
    expect(fn).to.throw(ReferenceError, /bad function/);
    expect(fn).to.throw(err);
    expect(fn).to.not.throw(new RangeError('Out of range.'));
    done()
  })
})



