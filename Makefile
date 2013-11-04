BIN = node_modules/.bin

download:
	curl https://raw.github.com/artsy/ezel/master/README.md > rm.md

w: download
	$(BIN)/jade index.jade -w

commit: download
	git checkout gh-pages
	$(BIN)/jade index.jade
	git add .
	git commit -a
	git push git@github.com:artsy/ezel.git gh-pages