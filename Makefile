#
# Make -- the OG build tool.
# Add any build tasks here and abstract complex build scripts into `lib` that
# can be run in a Makefile task like `coffee lib/build_script`.
#
# Remember to set your text editor to use 4 size non-soft tabs.
#

BIN = node_modules/.bin

# Start the server
s:
	node index.js

# Run all of the project-level tests, followed by app-level tests
test: assets
	$(BIN)/mocha $(shell find test -name '*.js' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/*/test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.js' -not -path 'test/helpers/*')

# Generate minified assets from the /assets folder and output it to /public.
assets:
	mkdir -p public/assets
	$(foreach file, $(shell find assets -name '*.js' | cut -d '.' -f 1), \
		$(BIN)/browserify $(file).js -t jadeify2 > public/$(file).js; \
		$(BIN)/uglifyjs public/$(file).js > public/$(file).min.js \
	)
	$(BIN)/stylus assets -o public/assets
	$(foreach file, $(shell find assets -name '*.styl' | cut -d '.' -f 1), \
		$(BIN)/sqwish public/$(file).css -o public/$(file).min.css \
	)

# Cleans up the initial GitHub app example files. After running this you might
# want to change the API_URL in config, mount your own app in lib/setup,
# set up your own fake API in test/helpers/integration, and delete this task.
clean:
	rm -rf apps/commits/
	rm collections/commits.js
	rm models/commit.js
	rm -rf public/assets/commits.js
	rm -rf public/assets/commits.css
	rm -rf public/assets/commits.min.js
	rm -rf public/assets/commits.min.css
	rm -rf components/search
	rm assets/commits.js
	rm assets/commits.styl
	rm test/models/commit.js
	rm LICENSE.md

.PHONY: test assets
