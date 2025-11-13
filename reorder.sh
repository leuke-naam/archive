target="../execut/src"
rm -rf $target/assets/ $target/content/
mkdir $target/assets
mkdir $target/content
cd src/assets/
target="../../$target"
cp -r partners portraits venues $target/assets
cd ../content/
cp -r partners people talks venues workshops $target/content
for year in *.yml ; do
  echo $year
  cp $year $target/content/
  sleep 1
done
