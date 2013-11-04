BIN = node_modules/.bin

w:
	$(BIN)/jade index.jade -w

commit:
	git checkout gh-pages
	curl https://raw.github.com/artsy/ezel/master/README.md > readme.md
	$(BIN)/jade index.jade
	git add .
	git commit -a
	git push git@github.com:artsy/ezel.git gh-pages