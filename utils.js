var fs = require('fs');

var dist = './dist';
var icuprefix = 'icudt';
var icusuff = '.dat';
var pkgtmp = 'package-dist-template.json';
var pkg = dist+'/'+'package.json';
var config = dist+'/'+'icu-config.json';

function loadJson(fn) {
    var str = fs.readFileSync(fn);
    return JSON.parse(str);
}

function saveJson(fn, o) {
    fs.writeFileSync(fn, JSON.stringify(o));
}

function writePkg(opts) {
    var o = loadJson(pkgtmp);
    o.version = '0.'+opts.major+'.'+opts.minor;
    if (opts.endian == 'l') {
        o.description = o.description + ' (Little Endian)';
    } else if (opts.endian == 'b') {
        o.description = o.description + ' (Big Endian)';
    } else if (opts.endian == 'e') {
        o.description = o.description + ' (EBCDIC Big Endian)';
    } else {
        throw "Unknown endianness " + opts.endian;
    }
    // save updated package.json
    saveJson(pkg, o);

    // save config opts
    saveJson(config, opts);
    return o;
}

module.exports = {
    writePkg: writePkg
};
