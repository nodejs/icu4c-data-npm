#!/bin/bash

FETCH="wget -c"
# use this for more parallelism
CORES=${CORES-1}
MAKE=${MAKE-make}

if [[ $# -ne 1 ]];
then
    echo "Usage:   $0 icuver"
    echo "Example: $0 62.1"
    exit 1
fi

MAJOR=$(echo $1 | cut -d. -f1)

if [[ -f icudt${MAJOR}b.dat ]] && [[ -f icudt${MAJOR}l.dat ]];
then
    echo "icudt${MAJOR}b.dat / icudt${MAJOR}l.dat already exist."
else
    ICUURL=https://ssl.icu-project.org/files/icu4c/${1}/icu4c-$(echo $1 | tr . _)-src.tgz
    ICUTGZ=$(basename $ICUURL)

    if [[ ! -f tmp/${ICUTGZ} ]];
    then
        echo "Fetching $ICUURL"
        mkdir -p tmp
        ( cd tmp ; $FETCH $ICUURL && exit 1 ) && (echo could not fetch $ICUURL; exit 1 )
    fi

    if [[ ! -f tmp/icupkg ]];
    then
        echo "building ICU so we get icupkg"
        # make sure we have a work location
        if [[ ! -d tmp/icu ]];
        then
            echo "Unpacking $ICUTGZ"
            mkdir -p tmp
            ( cd tmp ; $FETCH $ICUURL && exit 1 ) && (echo could not fetch $ICUURL; exit 1 )
            ( cd tmp ; tar xfpz $ICUTGZ || exit 1 )
            if [[ ! -d tmp/icu ]];
            then
                echo "unpack failed (no file tmp/icu)"
                exit 1
            fi
        fi

        if [[ ! -f tmp/icubuild/config.status ]];
        then
            mkdir -p tmp/icubuild
            ( cd tmp/icubuild ; ../icu/source/configure --disable-debug --enable-static --disable-shared --disable-extras --disable-layoutex --disable-tests --disable-samples --with-data-packaging=files || exit 1)
        fi


        if [[ ! -f tmp/icubuild/bin/icupkg ]];
        then
            # skip data build
            ${MAKE} -C tmp/icubuild/ -j${CORES} DATASUBDIR= || exit 1
        fi
        ln -v tmp/icubuild/bin/icupkg tmp/icupkg
        echo "Cleaning up tmp/icubuild and tmp/icu"
        rm -rf tmp/icubuild tmp/icu
    fi
    # set -x
    # now extract just the target
    rm -rf tmp/${MAJOR} && mkdir -p tmp/${MAJOR} || exit 1
    echo Extracting from $ICUURL
    (cd tmp/${MAJOR} ; tar --strip-components=4 -x -v -p -z -f ../${ICUTGZ} icu/source/data/in/icudt${MAJOR}l.dat && ln -f -v icudt${MAJOR}l.dat ../..  ) || exit 1 

    # now make big endian
    tmp/icupkg -tb ./icudt${MAJOR}l.dat ./icudt${MAJOR}b.dat
    ls -lh ./icudt${MAJOR}[lb].dat

fi



echo "Now  run npm run gen -- icudt${MAJOR}l.dat (and its output)"
echo "Then run npm run gen -- icudt${MAJOR}l.dat (and its output)"