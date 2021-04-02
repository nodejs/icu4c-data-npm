ICU4C Data Packager for Node
###

# Future Obsolescence?

See https://github.com/unicode-org/full-icu-npm/issues/36 — no updates are planned for ICU 65 and following, for little endian intel.

Background
---

This is the data package builder for the [full-icu](https://www.npmjs.com/package/full-icu) package. See that if you just want to install ICU data.

Usage: Building the data
---

To use, first get the data file, such as `icudt58l.dat` from an ICU build or from the official ICU source tarball (.tgz/.zip)

You may be able to use the following script to do so if `bash` is available:

    bash fetchdata.sh 58.2

Then, publish the little-endian file

    npm run gen -- icudt58l.dat

This will output a line labelled "run this command". (starting with `rm …`) Run that command after each `npm run gen`.

Now publish the big endian file.

    npm run gen -- icudt58b.dat
    # (remember to run the commands instructed)

LICENSE
===

- Usage of data and software is governed by the [Unicode Terms of Use](http://www.unicode.org/copyright.html)
a copy of which is included as [LICENSE](./LICENSE)

COPYRIGHT
===

Copyright &copy; 1991-2021 Unicode, Inc.
All rights reserved.
[Terms of use](http://www.unicode.org/copyright.html)
