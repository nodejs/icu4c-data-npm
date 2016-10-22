var argv = require('minimist')(process.argv.slice(2));

var utils = require('./utils.js')

function usage() {
	throw Error('Usage:  <icudt___.dat> | --endian z --major y --minor x');
}

if(argv._.length === 0) {
	console.log('Writing single package');
	utils.writePkg(argv);
} else {
	if(argv._.length !== 1) {
		usage();
	} else {
		var fn = argv._[0];
		if(fn.indexOf('icudt')!==0) {
			usage();
		} else {
			var icumaj = fn[5]+fn[6];
			var icuend = fn[7];
			if(fn !== 'icudt' + icumaj + icuend + '.dat') {
				usage();
			}
			argv.endian = icuend;
			argv.major = icumaj;
			argv.minor = argv.minor || ("ebl".indexOf(icuend));
			console.dir(argv);
			utils.writePkg(argv);
			console.log('Run this command::')
			console.log('rm -f dist/*.dat && cp ' + fn + ' dist/ && ( cd dist && npm publish --tag ' + icumaj+icuend + ')');
		}
	}
}
