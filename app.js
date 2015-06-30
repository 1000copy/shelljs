// var opts = require("nomnom")
//    .option('debug', {
//       abbr: 'd',
//       flag: true,
//       help: 'Print debugging info'
//    })
//    .option('config', {
//       abbr: 'c',
//       default: 'config.json',
//       help: 'JSON file with tests to run'
//    })
//    .option('version', {
//       flag: true,
//       help: 'print version and exit',
//       callback: function() {
//          return "version 1.2.4";
//       }
//    })
//    .parse();
//    console.log(opts.debug)
//    console.log(opts.config)   
//    console.log(opts._)
// 支持sub command 
// var parser = require("nomnom");
// function runBrowser(a){console.log(a)}
// parser.command('browser')
//    .callback(function(opts) {
//       runBrowser(opts.url+" "+opts.g+opts._);
//    })
//    .option('url', {
//       abbr: 'u',
//       help: "url to "
//    })
//    .option('g', {
//       abbr: 'g',
//       help: "url to ",
//       flag:true
//    })
//    .help("run browser tests");

// parser.command('sanity')
//    .option('outfile', {
//       abbr: 'o',
//       help: "file to write results to"
//    })
//    .option('config', {
//       abbr: 'c',
//       default: 'config.json',
//       help: "json manifest of tests to run"
//    })
//    .callback(function(opts) {
//       runSanity(opts.filename);
//    })
//    .help("run the sanity tests")

// parser.parse();
// 然而，sub command模式下，对不知道的参数，没有提示错误，或者显示帮助


// var opts = require("nomnom")
//    .option('debug', {
//       abbr: 'd',
//       flag: true,
//       help: 'Print debugging info'
//    })
//    .option('config', {
//       abbr: 'c',
//       default: 'config.json',
//       help: 'JSON file with tests to run'
//    })
//    .option('version', {
//       flag: true,
//       help: 'print version and exit',
//       callback: function() {
//          return "version 1.2.4";
//       }
//    })
//    .parse;
//    var b = opts("list -d -c adfkd")
//    console.log(b.debug)
//    console.log(b.config)   
//    console.log(b._)

console.log(process.argv)