//app.js

var assert = require("assert")

var cli = require("./src/cli.js")

// var options = {
// 		R:false,
// 		A:false,
// 		_:["app.js","hi.js"]
// 	}
// var r = cli._ls(options)


var d = require("./dispatcher.js")
assert.deepEqual(["app.js"],d.run("ls -RA app.js"))

assert.equal(__dirname,d.run("pwd"))
assert.equal(undefined,d.run("cd ./test"))
assert.equal(undefined,d.run("cd .."))
assert.equal(__dirname,d.run("pwd"))//
assert.equal(d.run("cat app.js").slice(0,5),"//app")
assert.equal(d.run("cat readme.md ").length>=0,true)//


