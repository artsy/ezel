var Backbone = require('backbone')
  , sd = require('sharify').data;

module.exports = Commit = Backbone.Model.extend({

  url: function() {
    return sd.API_URL + '/repos/' + this.collection.owner + '/'
         + this.collection.repo + '/' + this.get('sha');
  }
  
});