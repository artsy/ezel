BIN = node_modules/.bin

w:
	$(BIN)/jade index.jade -w

commit:
	curl https://raw.githubusercontent.com/artsy/ezel/master/README.md > README.md
	node build.js
	git add .
	git commit -a
	git push git@github.com:artsy/ezel.git gh-pages

open:
	node build.js
	open index.html