rm -rf temp/

# Clean project and create bun.lock
for dir in execut-*; do
  cd $dir
  rm -rf .git/ .astro/ dist/ node_modules/ bun.lock
  bun install
  rm -rf node_modules/
  cd ../
done

mkdir temp

for dir in execut-*; do
  cp -r $dir temp/
  cd temp/$dir
  git init
  git add .
  git switch -c archive
  git commit -m "feat: initial commit 🥳"
  git remote add origin git@github.com:stichting-sticky/$dir.git
  git push -u origin archive
  cd ../../
done
