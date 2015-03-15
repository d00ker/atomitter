#! /usr/bin/env bash
set -e

#DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#echo $DIR

git clone https://github.com/atom/atom-shell.git

rm -r atom-shell/atom/browser/default_app/*
cp atomitter/* atom-shell/atom/browser/default_app

cd atom-shell
./script/bootstrap.py -v
./script/build.py
#./script/test.py
open out/Debug/Atom.app