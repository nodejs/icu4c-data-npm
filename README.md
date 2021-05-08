# `icu4c-data`

An ICU4C Data Packager for Node.js

> Note: This module may become obsolete, please refer to [this issue](https://github.com/unicode-org/full-icu-npm/issues/36) accordingly. No updates have been planned for ICU 65 and above, in regards to little endian Intel systems.

## About `icu4c-data`

This is the data package builder for the [full-icu](https://www.npmjs.com/package/full-icu) module. Please refer to [full-icu](https://www.npmjs.com/package/full-icu) if you only want to install ICU data.

## Use: Building the data

To use this module: first acquire the data file, such as `icudt58l.dat` from an ICU build, or from the official ICU source tarball (.tgz/.zip).

1. You can use the following script to do so in `bash`:

```
bash fetchdata.sh 58.2
```

2. Then publish the little-endian file

```
npm run gen -- icudt58l.dat
```

This will output a line labelled 'run this command' (starting with `rm …`). Run that command after each time you execute `npm run gen`.

3. Now publish the big endian file.

`npm run gen -- icudt58b.dat`

> Remember to run the commands as instructed in section 2.

## LICENSE

This repository is subject to the terms under the [Node.js license](https://github.com/nodejs/node/blob/master/LICENSE). Some usage of this data is governed by the [Unicode Terms of Use](http://www.unicode.org/copyright.html), which is included in the [unicode-license.txt](./unicode-license.txt)

## COPYRIGHT

Copyright &copy; 1991-2021 Unicode, Inc. and Node.js contributors. All rights reserved.

[Unicode terms of use](http://www.unicode.org/copyright.html)
