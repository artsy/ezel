#
# Make -- the OG build tool.
# Add any build tasks here and abstract complex build scripts into `lib` that
# can be run in a Makefile task like `coffee lib/build_script`.
#
# Remember to set your text editor to use 4 size non-soft tabs.
#

BIN = node_modules/.bin
ENV_FILE_URL = https://gist.githubusercontent.com/<your-raw-env-gist>/.env

# Check for an .env file and download it if it doesn't exist
downloadenv:
	if [ -a .env ]; then echo; else curl $(ENV_FILE_URL) > .env; fi;

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
		$(BIN)/browserify $(file).js -t jadeify > public/$(file).js; \
		$(BIN)/uglifyjs public/$(file).js > public/$(file).min.js \
	)
	$(BIN)/stylus assets -o public/assets
	$(foreach file, $(shell find assets -name '*.styl' | cut -d '.' -f 1), \
		$(BIN)/sqwish public/$(file).css -o public/$(file).min.css \
	)

.PHONY: test assets
