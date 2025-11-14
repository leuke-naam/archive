#!/bin/bash
for size in 16 32 48 64 128 180 192 256 512; do
  inkscape --export-filename="icon-${size}x${size}.png" -w $size -h $size favicon.svg
done

convert \
  icon-16x16.png \
  icon-32x32.png \
  icon-48x48.png \
  icon-64x64.png \
  icon-128x128.png \
  icon-256x256.png \
  -colors 256 \
  -compress zip \
  -define icon:auto-resize \
  -define icon:format=png \
  -depth 32 \
  favicon.ico

rm icon-16x16.png icon-32x32.png icon-48x48.png icon-64x64.png icon-128x128.png icon-256x256.png

for year in execut-* ; do
  echo year: $year
  cd $year
  mv favicon.ico favicon.svg icon-180x180.png icon-192x192.png icon-512x512.png manifest.json public/
  cd ..
done
