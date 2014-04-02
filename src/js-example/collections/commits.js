//
// Collection for GitHub "commits".
//
// [Sharify](https://github.com/artsy/sharify) lets us require the API url
// and Backbone.sync is replaced with a server-side HTTP module in /lib/setup
// using [Backbone Super Sync](https://github.com/artsy/backbone-super-sync).
// This combined with [browerify](https://github.com/substack/node-browserify)
// makes it simple to share this module in the browser and on the server.
//

var Backbone = require('backbone'),
    sd = require('sharify').data,
    Commit = require('../models/commit');

module.exports = Commits = Backbone.Collection.extend({

  model: Commit,

  url: function() {
    return sd.API_URL + '/repos/' + this.owner + '/' + this.repo + '/commits';
  },

  initialize: function(models, options) {
    this.owner = options.owner;
    this.repo = options.repo;
  }

});