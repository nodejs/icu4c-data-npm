ICU4C Data Packager for Node
###

# Obsolescence

See https://github.com/unicode-org/full-icu-npm/issues/36 — no updates are planned for ICU 65 and following, for little endian intel.

Background
---

https://unicode-org.atlassian.net/browse/ICU-11617

Usage
---


To use, first get the data file, such as `icudt58l.dat` from an ICU build or from the official ICU source tarball (.tgz/.zip)

You may be able to use the following script to do so if `bash` is available:

    bash fetch-data.sh 58

Then, publish the little-endian file

    npm run gen -- icudt58l.dat

This will output a line labelled "run this command". (starting with `rm …`) Run that command after each `npm run gen`.

Now publish the big endian file.

    npm run gen -- icudt58b.dat
    # (remember to run the commands instructed)

COPYRIGHT
---
This software is part of ICU, and as such is under the same terms. See [LICENSE](LICENSE).
