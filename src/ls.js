
var fs = require('fs');
var os = require('os');
var path = require('path');
var common = require('./common.js');
var _pwd = require("./pwd.js")
var _cd = require("./cd.js")
module.exports = _ls;
function platform(){
	return os.type().match(/^Win/) ? 'win' : 'unix';
}
// options = argv{A,R,_{path,path}}
function _ls(options,paths) {
  options.recursive = options.R
  options.all = options.A
  delete options.A
  delete options.R
  if (paths==undefined){
    if (options._)
      paths = options._
  }
  if (!paths || paths.length == 0)
      paths = ['.'];
  // console.log(paths)
  var list = [];

  // Conditionally pushes file to list - returns true if pushed, false otherwise
  // (e.g. prevents hidden files to be included unless explicitly told so)
  function pushFile(file, query) {
    // console.log(file,query)
    // hidden file?
    if (path.basename(file)[0] === '.') {
      // not explicitly asking for hidden files?
      if (!options.all && !(path.basename(query)[0] === '.' && path.basename(query).length > 1))
        return false;
    }

    if (platform() === 'win')
      file = file.replace(/\\/g, '/');

    list.push(file);
    return true;
  }

  paths.forEach(function(p) {
    if (fs.existsSync(p)) {
      var stats = fs.statSync(p);
      // Simple file?
      if (stats.isFile()) {
        pushFile(p, p);
        return; // continue
      }

      // Simple dir?
      if (stats.isDirectory()) {
        // Iterate over p contents
        fs.readdirSync(p).forEach(function(file) {
          if (!pushFile(file, p))
            return;

          // Recursive?
          if (options.recursive) {
            var oldDir = _pwd();
            _cd('', p);
            if (fs.statSync(file).isDirectory())
            list = list.concat(_ls(options), file+'/*');
            _cd('', oldDir);
          }
        });
        return; // continue
      }
    }

    // p does not exist - possible wildcard present

    var basename = path.basename(p);
    var dirname = path.dirname(p);
    // Wildcard present on an existing dir? (e.g. '/tmp/*.js')
    if (basename.search(/\*/) > -1 && fs.existsSync(dirname) && fs.statSync(dirname).isDirectory) {
      // Escape special regular expression chars
      var regexp = basename.replace(/(\^|\$|\(|\)|<|>|\[|\]|\{|\}|\.|\+|\?)/g, '\\$1');
      // Translates wildcard into regex
      regexp = '^' + regexp.replace(/\*/g, '.*') + '$';
      // Iterate over directory contents
      fs.readdirSync(dirname).forEach(function(file) {
        if (file.match(new RegExp(regexp))) {
          if (!pushFile(path.normalize(dirname+'/'+file), basename))
            return;

          // Recursive?
          if (options.recursive) {
            var pp = dirname + '/' + file;
            if (fs.lstatSync(pp).isDirectory())
              list = list.concat(_ls({R:true,A:options.all}, pp+'/*'));
          } // recursive
        } // if file matches
      }); // forEach
      return;
    }

    throw new Error('no such file or directory: ' + p)//common.error('no such file or directory: ' + p, true);
  });

  return list;
}
