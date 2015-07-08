// commands dispatcher

var _ = require("underscore")
var _ls = require("./ls.js")
var opt = require('minimist')
var _cp = require("./cp.js")
var _rm = require("./rm.js")
var _mkdir = require("./mkdir.js")
var _mv = require("./mv.js")
var common = require("./common.js")
var _tempDir = require("./tempdir.js")
var _cat = require("./cat.js")

var _cd = require("./cd.js")
var _pwd = require("./pwd.js")
var _touch = require("./touch.js")
var _to = require("../src/to.js")._to
var _toEnd = require("../src/to.js")._toEnd

exports.run = run 
//
var cmdgate = {
  ls :ls
  ,pwd:pwd
  ,cd:cd
  ,cat:cat
  ,cp:cp
  ,rm:rm
  ,touch:touch
  ,mkdir:mkdir
  ,mv:mv
  ,tempdir:tempdir
  ,to:to
  ,toend:toend
  ,find:find
  ,grep:grep
  ,sed:sed
}

function sed (str){
  var argv = opt(String2Argv(str),{});//force
  var poses = argv._
  // console.log(poses)
  if (poses.length != 3)
      throw new common.ArgumentLengthError()
  return _to({},poses[1],poses[2])
}    

function find (str){
  var argv = opt(String2Argv(str),{});//force
  var poses = argv._
  // console.log(poses)
  if (poses.length != 3)
      throw new common.ArgumentLengthError()
  return _to({},poses[1],poses[2])
}    

function grep (str){
  var argv = opt(String2Argv(str),{});//force
  var poses = argv._
  // console.log(poses)
  if (poses.length != 3)
      throw new common.ArgumentLengthError()
  return _to({},poses[1],poses[2])
}    

function to (str){
  var argv = opt(String2Argv(str),{});//force
  var poses = argv._
  // console.log(poses)
  if (poses.length != 3)
      throw new common.ArgumentLengthError()
  return _to({},poses[1],poses[2])
}    
function toend (str){
  var argv = opt(String2Argv(str),{});//force
  var poses = argv._
  // console.log(poses)
  if (poses.length != 3)
      throw new common.ArgumentLengthError()
  return _toEnd({},poses[1],poses[2])
  
}    
function tempdir(str){
  var argv = opt(String2Argv(str),{});//force
  var poses = argv._
  if (poses.length != 1)
      throw new common.ArgumentLengthError()
  return _tempDir()
}
function mv(str){
  var argv = opt(String2Argv(str),{boolean:["f"]});//force
  argv.force = argv.f
  var poses = argv._
  if (poses.length <3)
      throw new common.ArgumentLengthError()
  _mv(argv,poses[1],poses[2])
}


function mkdir(str){
  var argv = opt(String2Argv(str),{boolean:["p"]});
  argv.fullpath = argv.p 
  var poses = argv._
  if (poses.length !=2)
      throw new common.ArgumentLengthError(1)
  _mkdir(argv,poses.slice(1))
}


function touch(str){
  var argv = opt(String2Argv(str),{});
  var poses = argv._
  if (poses.length !=2)
      throw new common.ArgumentLengthError(1)
  _touch(poses[1])
}
function rm (str){
  var argv = opt(String2Argv(str),{boolean:["R","f"]});
  argv.force = argv.f
  argv.recursive = argv.R
  delete argv.f
  delete argv.R
  //@ + `-f`: force
//@ + `-r, -R`: recursive
  var poses = argv._
  // console.log(poses)
  if (poses.length !=2)
      throw new common.ArgumentLengthError(1)
  files = [].slice.call(poses, 1);
  return _rm(argv,files)
}

function cp (str){
  var argv = opt(String2Argv(str),{boolean:["R","f"]});
  argv.force = argv.f
  argv.recursive = argv.R
  delete argv.f
  delete argv.R
  //@ + `-f`: force
//@ + `-r, -R`: recursive
  var poses = argv._
  console.log(poses)
  if (poses.length !=3)
      throw new common.ArgumentLengthError(3)
  return _cp(argv,poses[1],poses[2])    
}


function cat (str){
  var argv = opt(String2Argv(str));
  argv._ = argv._.slice(1)
  return _cat(argv._)    
}

function ls (str){
  var argv = opt(String2Argv(str),{boolean:["R","A"]});
  argv._ = argv._.slice(1)
  return _ls(argv)    
}
function pwd (str){
  var argv = opt(String2Argv(str),{});
  argv._ = argv._.slice(1)
  return _pwd(argv)    
}
function cd (str){
  var argv = opt(String2Argv(str),{});
  if (argv._.length !=2)
  	throw new common.ArgumentLengthError(1)
  var d = argv._[1]
  // console.log(d)
  // console.log(argv)
  return _cd(d)    
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