FILES=dist/*
SRC=src/*

/home/$(USER)/NewTabExtension.zip: $(FILES) $(SRC) packExtension.sh
	rm -f /home/$(USER)/NewTabExtension.zip
	./packExtension.sh