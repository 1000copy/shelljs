var argv = require('yargs')
    .usage('Usage: \nlist files.\n')
    .options({
      'r': {
        alias: 'rescure',
        demand: true,
        // default: false,
        describe: 'resucre directory',
        type: 'boolean'
      }        
    })
    .options({
      'a': {
        alias: 'all',
        demand: false,
        default: false,
        describe: 'show hidden all file include hidden',
        type: 'boolean'
      }
    })
    .argv      
// console.log(yargs.help())
console.log(argv.r)