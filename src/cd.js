var path = require('path');
var fs = require('fs');
var os = require('os');
var common = require('./common.js');




function _cd(options,dir) {
  console.log(dir)
  if (!dir)
    throw new Error('directory not specified');

  if (!fs.existsSync(dir))
    throw new Error('no such file or directory: ' + dir);

  if (!fs.statSync(dir).isDirectory())
    throw new Error('not a directory: ' + dir);

  process.chdir(dir);
}

module.exports = _cd;