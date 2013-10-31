#
# Make -- the OG build tool.
# Add any build tasks here and abstract complex build scripts into `lib` that 
# can be run in a Makefile task like `coffee lib/build_script`.
#
# Remember to set your text editor to use 4 size non-soft tabs.
#

BIN = node_modules/.bin

s:
	node index.js

test: assets
	$(BIN)/mocha $(shell find test -name '*.js' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.js' -not -path 'test/helpers/*')

assets:
	$(BIN)/stylus lib/assets/ -o public/assets/
	$(BIN)/browserify lib/assets/commits.js -t jadeify2 > public/assets/commits.js

clean:
	rm -rf apps/commits/
	rm collections/commits.js
	rm models/commit.js
	rm -rf public/assets/commits.js
	rm -rf public/assets/commits.css
	rm assets/commits.js
	rm assets/commits.styl
	rm test/models/commit.js
	rm LICENSE.md

.PHONY: test