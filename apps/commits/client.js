var Backbone = require('backbone')
  , $ = Backbone.$ = require('components-jquery');
  , sd = require('sharify').data
  , Commits = require('../../collections/commits.coffee');

module.exports.CommitsView = CommitsView = Backbone.View.extend({
  
  template: function() {
    return require('./templates/list.jade').apply(null, arguments);
  },

  initialize: function() {
    this.collection.on('sync', this.render, this);
  },

  render: function() {
    this.$('#cards-list').html(this.listTemplate({ commits: this.collection.models }));
  },
  
  events: {
    'keyup #cards-repo': 'debounceChangeRepo'
  },
  
  changeRepo: function(e) {
    _this.collection.repo = $(e.target).val();
    return _this.collection.fetch();
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

$(init);