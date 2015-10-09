//var process = require('process');

if(!process || !process.versions || !process.versions.node) {
	throw Error('Sorry- don’t know what version of Node you are on.');
}

var nodever = process.versions.node;

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

// get 'major' number
var icumaj = icuver.split('.')[0];

// This is kind of a sanity check that the ICU version is correct.
// ICU 54 was what Node v0.12 started with.
if( icumaj < 54 ) {
    throw Error('Don’t know how to work with ICU version ' + icumaj + ', sorry.');
}

if(process.config.variables.icu_endianness) {
    icuend = process.config.variables.icu_endianness.toLowerCase();
}

if( (icuend.length != 1) || ("lbe".indexOf(icuend) == -1)) {
    throw Error('Don’t know what to make of endianness “'+icuend+'” - expected l, b, or e');
}

var icupkg = "icu4c-data@" + icumaj+icuend;

console.log('npm install ' + icupkg + ' (Node ' + nodever + ' and small-icu ' + icuver + ')');


var npm = require('npm');

npm.load({}, function(err) {
	if(err) throw err;
	npm.commands.install([ icupkg ], function(err, data) {
		if(err) {
			throw err;
		}
		console.dir(data);
	});
	//npm.registry.log.on("log", console.log);
})

