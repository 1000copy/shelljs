var path = require('path');

function _pwd(options) {
  var pwd = path.resolve(process.cwd());
  return pwd;
}
// exports = _pwd ;
module.exports = _pwd;