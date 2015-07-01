var fs = require('fs');
var os = require('os');
exports.run = run ;
exports._ls = _ls ;
exports._pwd = _pwd ;
var opt = require('opt-string')
// hack : MUST NOT only run ls .
function run(cmd){

var s = opt()
      s
            .usage("a headline usage text")
            .demand(1)
            .options('A', {
                type:"boolean",
                describe:"all include hidden",
                default:false
            })
            .options('R', {
                type:"boolean"
                ,describe:"recursive to sub dir"
                ,default:false
            })
  var argv = s.parseString(cmd)
  // console.log(argv)   
  return _ls(argv);
}

function platform(){
	return os.type().match(/^Win/) ? 'win' : 'unix';
}
// options = argv{A,R,_{ls ,path,path}}
function _ls(options) {
  options.recursive = options.R
  options.all = options.A
  delete options.A
  delete options.R
  var paths
  if (options._)
    paths = options._.slice(1)
  if (!paths || paths.length == 0)
    paths = ['.'];
  
  var list = [];

  // Conditionally pushes file to list - returns true if pushed, false otherwise
  // (e.g. prevents hidden files to be included unless explicitly told so)
  function pushFile(file, query) {
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
              // list = list.concat(_ls('-R'+(options.all?'A':''), file+'/*'));
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
              list = list.concat(_ls('-R'+(options.all?'A':''), pp+'/*'));
          } // recursive
        } // if file matches
      }); // forEach
      return;
    }

    throw new Error('no such file or directory: ' + p)//common.error('no such file or directory: ' + p, true);
  });

  return list;
}

var path = require('path');

function _pwd(options) {
  var pwd = path.resolve(process.cwd());
  return pwd;
}
function _cd(options, dir) {
  if (!dir)
    throw new Error('directory not specified');

  if (!fs.existsSync(dir))
    throw new Error('no such file or directory: ' + dir);

  if (!fs.statSync(dir).isDirectory())
    throw new Error('not a directory: ' + dir);

  process.chdir(dir);
}