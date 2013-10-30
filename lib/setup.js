var c = require('../config')
  , express = require('express')
  , Backbone = require('backbone')
  , sharify = require('sharify')
  , path = require('path');

module.exports = function(app) {
  
  // Override Backbone to user server-side sync
  Backbone.sync = require('backbone-super-sync');

  // Setup some initial data for shared modules
  app.use(sharify({
    API_URL: c.API_URL
  }));

  // General express middleware
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);

  // Development only
  if ('development' == c.NODE_ENV) {
    app.use(express.errorHandler());
    
    // Compile assets on request in development
    app.use(require('stylus').middleware({
      src: path.resolve(__dirname, '../lib'),
      dest: path.resolve(__dirname, '../public')
    }));
    app.use(require('browserify-dev-middleware')({
      src: path.resolve(__dirname, '../lib'),
      transforms: [require('jadeify2')]
    }));
  }

  // Mount a fake API server in test
  if('test' == c.NODE_ENV) {
    app.use('/__api', require('../test/helpers/integration.js').api);
  }

  // Mount apps
  app.use(require('../apps/commits'));

  // More general middleware
  app.use(express.static(path.resolve(__dirname, '../public')));
}