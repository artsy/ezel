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

module.exports = (app) ->
  
  # Override Backbone to use server-side sync
  Backbone.sync = require "backbone-super-sync"
  # Set some headers for the Github API
  Backbone.sync.editRequest = (req) -> req.set 'User-Agent': 'artsy'
  
  # Setup some initial data for shared modules
  app.use sharify
    API_URL: API_URL
    JS_EXT: (if "production" is NODE_ENV then ".min.js" else ".js")
    CSS_EXT: (if "production" is NODE_ENV then ".min.css" else ".css")
  
  # General express middleware
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.json()
  app.use express.urlencoded()
  app.use express.methodOverride()
  app.use app.router
  
  # Development only
  if "development" is NODE_ENV
    app.use express.errorHandler()
    # Compile assets on request in development
    app.use require("stylus").middleware
      src: path.resolve(__dirname, "../")
      dest: path.resolve(__dirname, "../public")
    app.use require("browserify-dev-middleware")
      src: path.resolve(__dirname, "../")
      transforms: [require("jadeify2"), require('caching-coffeeify')]
  
  # Test only
  if "test" is NODE_ENV
    # Mount fake API server
    app.use "/__api", require("../test/helpers/integration.coffee").api  
    
  # Mount apps
  app.use require "../apps/commits"
  
  # More general middleware
  app.use express.static(path.resolve __dirname, "../public")