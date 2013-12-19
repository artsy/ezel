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
	$(BIN)/coffee index.coffee

# Run all of the project-level tests, followed by app-level tests
test: assets
	$(BIN)/mocha $(shell find test -name '*.coffee' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.coffee' -not -path 'test/helpers/*')

# Generate minified assets from the /assets folder and output it to /public.
assets:
	mkdir -p public/assets
	$(foreach file, $(shell find assets -name '*.coffee' | cut -d '.' -f 1), \
		$(BIN)/browserify $(file).coffee -t jadeify2 -t caching-coffeeify > public/$(file).js; \
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
	rm collections/commits.coffee
	rm models/commit.coffee
	rm -rf public/assets/commits.coffee
	rm -rf public/assets/commits.css
	rm -rf public/assets/commits.min.coffee
	rm -rf public/assets/commits.min.css
	rm assets/commits.coffee
	rm assets/commits.styl
	rm test/models/commit.coffee
	rm LICENSE.md

.PHONY: test assets
