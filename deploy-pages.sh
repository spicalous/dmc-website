git checkout master

git pull

git checkout gh-pages

git rebase master

rm -rf dist/

ember build --prod

cp -R dist/* .

git add -A

git commit -m "gh-pages"

git push
