set -e
set -x

git checkout master
git pull
git branch -f gh-pages gh-pages~1
git rebase master gh-pages
rm -rf dist/
ember build -dev
cp -R dist/* .
git add -A
git commit -m "gh-pages deploy"
# manual step: git push -f
