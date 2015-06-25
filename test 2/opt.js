var shell = require('..');

var assert = require('assert'),
    fs = require('fs');

shell.config.silent = true;

shell.rm('-rf', 'tmp');
shell.mkdir('tmp');

//
// Invalids
//

assert.equal(fs.existsSync('/asdfasdf'), false); // sanity check

var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);