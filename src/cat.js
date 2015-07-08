var fs = require('fs');
var os = require('os');
var common = require('./common.js');
var path = require('path');


function _cat(files) {
  var cat = '';

  if (!files)
    throw new common.CustomError('no paths given');

  if (typeof files === 'string')
    files = [].slice.call(arguments, 1);
  // if it's array leave it as it is

  files = common.expand(files);

  files.forEach(function(file) {
    if (!fs.existsSync(file))
      throw new common.CustomError('no such file or directory: ' + file);

    cat += fs.readFileSync(file, 'utf8') + '\n';
  });

  if (cat[cat.length-1] === '\n')
    cat = cat.substring(0, cat.length-1);

  return common.ShellString(cat);
}

module.exports = _cat ;
