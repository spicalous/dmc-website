#!/usr/bin/env bash
#
# Build the project and deploy the output into a predefined deploy folder
# The contents on the server will then need to be moved into the correct location

set -e
set -x

git checkout master
ember build -prod
scp -r dist/* root@meditationnewcastle.co.uk:/var/www/deploy
