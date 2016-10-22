ICU4C Data Packager for Node
###

Usage
---



To use, first get the data file, such as `icudt58l.dat` from an ICU build or from the official ICU source tarball (.tgz/.zip)

Then, publish the little-endian file

    npm run gen -- icudt58l.dat

This will output a line labelled "run this command". (starting with `rm …`) Run that command after each `npm run gen`.

    # convert to Big-Endian
    icupkg  -tb icudt58l.dat icudt58b.dat
    npm run gen -- icudt58b.dat
    # (remember to run the commands instructed)

    # convert to EBCDIC
    icupkg  -te icudt58l.dat icudt58e.dat
    npm run gen -- icudt58e.dat
    # Remember to run the commands instructed.


MIRROR
---
This is a mirror of source  currently  in
http://source.icu-project.org/repos/icu/tools/branches/srl/npm11617/release/c/icu4c-data-npm

COPYRIGHT
---

This software is part of ICU, and as such is under the same terms. See [LICENSE](LICENSE).
