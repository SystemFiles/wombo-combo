#!bin/bash
# Create directory structure in the container, then start the server
# By: Benjamin Sykes (SystemFiles)

set -e

# File setup
mkdir -p /data
mkdir -p /data/uploads
mkdir -p /data/exports
mkdir -p /data/files

# Start host
cpulimit -l 50 node server.js