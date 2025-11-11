for dir in execut-*; do
  cd $dir
  rm -rf .astro/ .git/ dist/ node_modules/
  bun install
  git init
  git add .
  git switch -c archive
  git commit -m "feat: initial commit 🥳"
  git remote add origin git@github.com:stichting-sticky/$dir.git
  git push -u origin archive
  cd ../
done
