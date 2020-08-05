#!/bin/bash
set -e

isLive() {
    if [[ $TRAVIS_TAG = *"-live"* ]]
    then
        #"-live" is in $TRAVIS_TAG
        echo "true"
    else
        #"-live" is not in $TRAVIS_TAG
        echo "false"
    fi
}

echo "============== CHECKING IF LIVE DEPLOYMENT CONDITION IS MET =============="
export LIVE=$(isLive)