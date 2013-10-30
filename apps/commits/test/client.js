var benv = require('benv')
  , sinon = require('sinon')
  , Commits = require('../../../collections/commits')
  , resolve = require('path').resolve;

benv.globals = function() {
  return {
    $: require('components-jquery')
  };
};

describe('CommitsView', function() {
  
  var CommitsView, view;

  before(function(done) {
    benv.setup(function() {
      benv.render(resolve(__dirname, '../templates/index.jade'), {
        sd: {},
        sharifyScript: function() {},
        commits: new Commits([], {
          owner: 'foo',
          repo: 'bar'
        }).models,
      }, function() {
        CommitsView = benv.requireWithJadeify(
          '../client.js',
          ['listTemplate']
        ).CommitsView;
        done();
      });
    });
  });

  beforeEach(function(done) {
    view = new CommitsView({
      el: $('body'),
      collection: new Commits([], { owner: 'artsy', repo: 'flare' })
    })
    done();
  });

  afterEach(function() {
    benv.teardown();
  });

  describe('#render', function() {

    it('renders the commits', function() {
      view.collection.reset([
        { commit: { message: 'Bump package.json version'} }
      ]);
      view.render();
      view.$el.html().should.include('Bump package.json version');
    });
  });

  describe('#changeRepo', function() {

    it('changes the repo and fetches', function() {
      sinon.stub(view.collection, 'fetch');
      view.$('#commits-repo-input').val('Garner').trigger('change');
      view.collection.repo.should.equal('Garner');
      view.collection.fetch.called.should.be.ok;
    });
  });
});