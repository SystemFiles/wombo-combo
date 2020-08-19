#!/bin/bash
set -e

isStable() {
    if [[ $TRAVIS_TAG = *"-stable"* ]]
    then
        #"-live" is in $TRAVIS_TAG
        echo "true"
    else
        #"-live" is not in $TRAVIS_TAG
        echo "false"
    fi
}

echo "============== CHECKING IF STABLE DEPLOYMENT CONDITION IS MET =============="
export STABLE=$(isStable)