//
// Sets up intial project settings, middleware, mounted apps, and
// global configuration such as overriding Backbone.sync and
// populating sharify data
//

var c = require('../config'),
  express = require('express'),
  Backbone = require('backbone'),
  sharify = require('sharify'),
  path = require('path'),
  fs = require('fs');

// Inject some constant data into sharify
sharify.data = {
  API_URL: c.API_URL,
  JS_EXT: 'production' == c.NODE_ENV ? '.min.js' : '.js',
  CSS_EXT: 'production' == c.NODE_ENV ? '.min.css' : '.css'
};

module.exports = function(app) {

  // Override Backbone to use server-side sync
  Backbone.sync = require('backbone-super-sync');

  // Mount sharify
  app.use(sharify);

  // Development only
  if ('development' == c.NODE_ENV) {
    // Compile assets on request in development
    app.use(require('stylus').middleware({
      src: path.resolve(__dirname, '../'),
      dest: path.resolve(__dirname, '../public')
    }));
    app.use(require('browserify-dev-middleware')({
      src: path.resolve(__dirname, '../'),
      transforms: [require('jadeify')]
    }));
  }

  // Test only
  if('test' == c.NODE_ENV) {
    // Mount fake API server
    app.use('/__api', require('../test/helpers/integration.js').api);
  }

  // Mount apps
  app.use('/', function(req, res) {
    res.send('Start by writing an app in /apps and mounting it in /lib/setup!');
  });

  // Mount static middleware for sub apps, components, and project-wide
  fs.readdirSync(path.resolve(__dirname, '../apps')).forEach(function(fld) {
    app.use(express.static(path.resolve(__dirname, '../apps/' + fld + '/public')));
  });
  fs.readdirSync(path.resolve(__dirname, '../components')).forEach(function(fld) {
    app.use(express.static(path.resolve(__dirname, '../components/' + fld + '/public')));
  });
  app.use(express.static(path.resolve(__dirname, '../public')));
}