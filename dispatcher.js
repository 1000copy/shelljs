// commands dispatcher

var _ = require("underscore")
var cli = require("./src/cli.js")
var opt = require('minimist')


exports.run = run 

function cat (str){
  var argv = opt(String2Argv(str));
  argv._ = argv._.slice(1)
  return cli._cat(argv._)    
}

function ls (str){
  var argv = opt(String2Argv(str),{boolean:["R","A"]});
  argv._ = argv._.slice(1)
  return cli._ls(argv)    
}
function pwd (str){
  var argv = opt(String2Argv(str),{});
  argv._ = argv._.slice(1)
  return cli._pwd(argv)    
}
function cd (str){
  var argv = opt(String2Argv(str),{});
  if (argv._.length !=2)
  	throw new Error("argv length must be 1")
  var d = argv._[1]
  // console.log(d)
  // console.log(argv)
  return cli._cd(d)    
}
var cmdgate = {
	ls :ls
	,pwd:pwd
	,cd:cd
	,cat:cat

}
var _ = require("underscore")
function run(str){
	// console.log(str)
	var f = whichCmd(str)
	if (f != undefined){
		return f(str)
	}
	return undefined
}
function whichCmd(str){
	var s = String2Argv(str)[0]
	var keys = Object.keys(cmdgate)

	if (_.indexOf(keys,s) >=0)
		return cmdgate[s]
	else
		return undefined
}


function String2Argv(str){
	return parseArgsStringToArgv(str,"","")
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