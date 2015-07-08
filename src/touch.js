var fs = require('fs');
var os = require('os');


module.exports = _touch 


function _touch(filepath){
  fs.closeSync(fs.openSync(filepath, 'w'));
}

// exports = _touch ;
