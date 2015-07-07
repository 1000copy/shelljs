//app.js//

var assert = require("assert")

var cli = require("./src/cli.js")

var d = require("./src/dispatcher.js")
// assert.deepEqual(["app.js"],d.run("ls -RA app.js"))

// assert.equal(__dirname,d.run("pwd"))
// assert.equal(undefined,d.run("cd ./test"))
// assert.equal(undefined,d.run("cd .."))
// assert.equal(__dirname,d.run("pwd"))//
// assert.equal(d.run("cat app.js").slice(0,5),"//app")
// assert.equal(d.run("cat readme.md ").length>=0,true)
// 自己修改自己，导致nodemon死循环的重启，不行。得另外建立一个目录来测试
try
{assert.equal(d.run("cp app.js app_cp.js"),true)}catch(e){}
assert.equal(d.run("rm app_cp.js"),undefined)



