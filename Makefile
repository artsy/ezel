BIN = node_modules/.bin

w:
	$(BIN)/jade index.jade -w

commit:
	node build.js
	git add .
	git commit -a
	git push git@github.com:artsy/ezel.git gh-pages

open:
	node build.js
	open index.html