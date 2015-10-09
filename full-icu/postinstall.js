//var process = require('process');

if(!process || !process.versions || !process.versions.node) {
	throw Error('Sorry- don’t know what version of Node you are on.');
}

var nodever = process.versions.node;

console.log('Figuring out how to get full-icu data for Node ' + nodever);

var nodesplit = nodever.split('.');

if((nodesplit[0] == 0) && (nodesplit[1] < 12)) {
	console.log('Not sure how to handle node < 0.12. Exitting.');
	process.exit(0);
}

if(process.config.variables.v8_enable_i18n_support === 0) {
	console.log('Note: Your node was not compiled with i18n support. Nothing to do, Exitting.');
	process.exit(0);
}

if(!process.config.variables.icu_small) {
	// not going to work..
	if(process.config.variables.icu_gyp_path === 'tools/icu/icu-system.gyp') {
		// this will be the case under homebrew, redhat/fedora, others..
		console.log('Note: Your node was compiled to link against an ' +
		'externally-provided ICU, so the locale data is not customizable ' +
		'through this script. Exitting.');
	} else {
		// maybe already full icu, or some as-yet-unforseen case.
		console.log('Note: Your node was not compiled with the ‘small-icu’ case,' +
		' so the ICU data is not customizable through this script. Exitting.');
	}
	process.exit(0);
}

var icuver;
var icuend = 'l';

if(process.versions.icu) {
	icuver = process.versions.icu; // Thanks https://github.com/nodejs/node/issues/3089
} else {
	icuver = process.config.variables.icu_ver_major; // only get the major
}

if(!icuver) {
	throw Error('Cannot determine Node’s ICU version!');
}

console.log('.. found ICU version ' + icuver );
