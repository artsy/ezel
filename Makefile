BIN = node_modules/.bin

s:
	node index.js

test: assets
	$(BIN)/mocha $(shell find test -name '*.js' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.js' -not -path 'test/helpers/*')

assets:
	$(BIN)/stylus lib/assets/ -o public/assets/
	$(BIN)/browserify lib/assets/commits.js -t jadeify2 > public/assets/commits.js

.PHONY: test