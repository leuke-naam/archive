# mkdir content
# cd content/
# mkdir people people/hosts partners talks venues workshops
# cd ..

cd src/content/
# cp *.yml ../../content/

for year in * ; do
  if [ -d "$year" ]; then
    cd $year
    # cp hosts/*.md ../../../content/people/hosts/
    # cp partners/*.md ../../../content/partners/
    # cp speakers/*.md ../../../content/people/
    # cp talks/*.md ../../../content/talks/
    # cp venue.md ../../../content/venues/$year.md
    mkdir -p ../../../content/workshops/$year/
    cp workshops/*.md ../../../content/workshops/$year/
    cd ..
  fi
done
