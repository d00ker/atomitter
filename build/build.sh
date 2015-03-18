#! /usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

npm install -g grunt-cli
npm install
grunt download-atom-shell
grunt copy
grunt uglify