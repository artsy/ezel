#
# Sets up intial project settings, middleware, mounted apps, and
# global configuration such as overriding Backbone.sync and
# populating sharify data
#

{ API_URL, NODE_ENV } = require "../config"
express = require "express"
Backbone = require "backbone"
sharify = require "sharify"
path = require "path"

# Inject some constant data into sharify
sharify.data =
  API_URL: API_URL
  JS_EXT: (if "production" is NODE_ENV then ".min.js" else ".js")
  CSS_EXT: (if "production" is NODE_ENV then ".min.css" else ".css")

module.exports = (app) ->

  # Override Backbone to use server-side sync
  Backbone.sync = require "backbone-super-sync"

  # Mount sharify
  app.use sharify

  # Development only
  if "development" is NODE_ENV
    # Compile assets on request in development
    app.use require("stylus").middleware
      src: path.resolve(__dirname, "../")
      dest: path.resolve(__dirname, "../public")
    app.use require("browserify-dev-middleware")
      src: path.resolve(__dirname, "../")
      transforms: [require("jadeify"), require('caching-coffeeify')]

  # Test only
  if "test" is NODE_ENV
    # Mount fake API server
    app.use "/__api", require("../test/helpers/integration.coffee").api

  # Mount apps
  app.use '/', (req, res) ->
    res.send 'Start by writing an app in /apps and mounting it in /lib/setup!'

  # More general middleware
  app.use express.static(path.resolve __dirname, "../public")