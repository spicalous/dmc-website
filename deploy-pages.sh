#!/usr/bin/env bash
#
# Builds the project with the dev flag and amends the git hub pages branch for pages deploy
#
# Ensure that the git hub pages branch only has 2 commits
# 1. amending the ember config
# 2. distribution files

set -e
set -x

git checkout master
git pull
git fetch
git checkout -B gh-pages origin/gh-pages
git reset --hard gh-pages~1
git rebase master gh-pages
rm -rf dist/
./node_modules/.bin/ember build -dev
cp -R dist/* .
git add -A
git commit -m "gh-pages deploy"
# manual step: git push -f
