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

readme:
	cd ~/ezel
	cp ~/ezel-pages/README.md ~/ezel/README.md
	git commit -a -m 'Update readme from gh-pages branch'
	git push origin master
	git checkout coffeescript
	cp ~/ezel-pages/README.md ~/ezel/README.md
	git commit -a -m 'Update readme from gh-pages branch'
	git push origin coffeescript