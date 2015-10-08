var argv = require('minimist')(process.argv.slice(2));

var utils = require('./utils.js')

utils.writePkg(argv);
