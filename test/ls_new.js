var assert = require("assert")

var cli = require("./src/cli.js")

var options = {
		R:false,
		A:false,
		_:["app.js","hi.js"]
	}
var r = cli._ls(options)
assert.equal(r.length>0,true)
assert.equal(r.length,2)
assert.deepEqual(r,["app.js","hi.js"])
var home = __dirname
// _pwd
var options = {}
var r = cli._pwd(options)
assert.equal(r,__dirname)
var fs = require('fs');
assert(true, fs.existsSync(__dirname + "\\test"))
assert(true, fs.existsSync("test"))
var options = {}
var r = cli._cd(options,"test")
var options = {}
var r = cli._pwd(options)
assert.equal(r,__dirname+"\\test")
var r = cli._cd(options,home)