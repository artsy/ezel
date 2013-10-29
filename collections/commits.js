var Backbone = require('backbone')
  , sd = require('sharify').data
  , Commit = require('../models/commit');

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