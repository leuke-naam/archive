# mkdir temp
for dir in execut-*; do
  cd $dir
  rm -rf .git/
  # git init
  # git add .
  # git switch -c archive
  # git commit -m "feat: initial commit 🥳"
  # git remote add origin git@github.com:stichting-sticky/$dir.git
  # git push -u origin archive
  cd ../
done
# rm -rf temp/
