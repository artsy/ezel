var Backbone = require('backbone')
  , $ = Backbone.$ = require('components-jquery')
  , sd = require('sharify').data
  , Commits = require('../../collections/commits.js')
  , listTemplate = function() {
    return require('./templates/list.jade').apply(null, arguments)
  };

module.exports.CommitsView = CommitsView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('sync', this.render, this);
  },

  render: function() {
    this.$('#commits-list').html(listTemplate({ commits: this.collection.models }));
  },
  
  events: {
    'change #commits-repo-input': 'changeRepo'
  },
  
  changeRepo: function(e) {
    this.collection.repo = $(e.target).val();
    this.collection.fetch();
  }
});

module.exports.init = function() {
  new CommitsView({
    el: $('body'),
    collection: new Commits(sd.COMMITS, {
      owner: 'artsy',
      repo: 'flare'
    })
  });
};