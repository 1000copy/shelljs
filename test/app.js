var expect = require('chai').expect
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
var _tempDir = require("../src/tempdir.js")
describe('cli', function () {
  it('should have ..', function (done) {
    expect(_tempDir()).to.eql(_tempDir())
    done()
  })
  it('tempdir', function (done) {
    expect(d.run("tempdir")).to.eql(_tempDir())
    done()
  })
  it('toend', function (done) {
    d.run("to new ./data/new.js")
    d.run("toend tail ./data/new.js")
    expect(d.run("cat ./data/new.js")).to.eql("newtail")
    done()
  })
  it('which', function (done) {
    var _which = require("../src/which.js")
    // _which({},"mocha").indexOf("mocha")
    expect(_which({},"mocha").indexOf("mocha")).to.not.equal(-1)
    expect(_which({},"node").indexOf("node")).to.not.equal(-1)
    expect(_which({},"ls").indexOf("ls")).to.not.equal(-1)
    expect(_which({},"mocha").indexOf("mocha")).to.not.equal(-1)
    expect(_which({},"mocha").indexOf("mocha")).to.not.equal(-1)
    done()
  })
  it('find', function (done) {
    var _find = require("../src/find.js")    
    expect(_find("data")).to.eql(d.run("find data"))
    expect(_find("data","test")).to.eql(d.run("find data test"))
    done()
  })
  it('ls', function (done) {
    var _ls = require("../src/ls.js")
    expect(_ls({R:false,A:false},["."])).to.eql(d.run("ls ."))
    done()
  })
  it('grep', function (done) {
    var _grep = require("../src/grep.js")
    expect(_grep({v:false},/abc/,"test/app.js")).to.eql(d.run("grep abc test/app.js"))
    expect(_grep({v:true},/abc/,"test/app.js")).to.eql(d.run("grep -v abc test/app.js"))    
    done()
  })
  it('sed', function (done) {    
    var _sed = require("../src/sed.js")
    expect(_sed({i:false},/tail/,"head","data/new.js")).to.eql(d.run("sed tail head data/new.js"))
    expect(_sed({i:true},/tail/,"head","data/new.js")).to.eql(d.run("sed -i tail head data/new.js"))
    done()
  })
})

// blow for grep test
// abc ghi
// abc def


//todo : find ,grep ,sed 需要继续改成命令