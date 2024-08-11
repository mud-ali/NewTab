#!/bin/zsh

rm -f ./extension.zip ~/NewTabExtension.zip && cd dist \
&& zip -r ~/NewTabExtension ./**

# used for testing, because the file dialog opens up to ~ 
# val

