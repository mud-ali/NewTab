#!/bin/zsh

rm -f ./extension.zip ~/NewTabExtension.zip

cd dist
zip -r extension ./**

# used for testing, because the file dialog opens up to ~ 
cp extension.zip ~/NewTabExtension.zip
mv extension.zip ..

