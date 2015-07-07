
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

// console.log("ls",d.run("ls -RA app.js"))
// assert.equal("cd",d.whichCmd("cd")())
assert.equal(__dirname,d.run("pwd"))
assert.equal(undefined,d.run("cd ./test"))
assert.equal(undefined,d.run("cd .."))
assert.equal(__dirname,d.run("pwd"))


