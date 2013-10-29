var c = require('../config')
  , express = require('express')
  , Backbone = require('backbone')
  , sharify = require('sharify');

module.exports = function(app) {
  
  // Override Backbone to user server-side sync
  Backbone.sync = require('backbone-super-sync');

  // Setup some initial data for shared modules
  app.use(sharify({
    API_URL: c.API_URL
  }));

  // Mount apps
  app.use(require('../apps/commits'));
}