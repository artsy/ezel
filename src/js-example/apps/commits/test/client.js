//
// Tests for the client-side code of the commits app. Because
// [Browserify](https://github.com/substack/node-browserify) allows us to
// write our client-side in modules, testing becomes a lot easier. There are
// still some obstacles to unit testing client-side code such as not having
// a DOM available. In this case we use [benv](https://github.com/artsy/benv)
// to create a more suitable environment for unit testing client-side code in
// node.js.
//

var benv = require('benv'),
    sinon = require('sinon'),
    Commits = require('../../../collections/commits'),
    resolve = require('path').resolve;

describe('CommitsView', function() {

  var CommitsView, view;

  // In this before hook we setup our browser environemnt using
  // [benv](https://github.com/artsy/benv). This and the above `benv.globals=`
  // may be refactored into a /test/helpers/client module to DRY up
  // some setup. For this example we keep it simple.
  before(function(done) {
    benv.setup(function() {
      benv.render(resolve(__dirname, '../templates/index.jade'), {
        sd: {},
        sharify: { script: function() {} },
        commits: new Commits([], {
          owner: 'foo',
          repo: 'bar'
        }).models,
      }, function() {
        benv.expose({ $: require('jquery') });
        CommitsView = benv.requireWithJadeify(
          '../client.js',
          ['listTemplate']
        ).CommitsView;
        done();
      });
    });
  });

  after(function() {
    benv.teardown();
  });

  beforeEach(function(done) {
    view = new CommitsView({
      el: $('body'),
      collection: new Commits([], { owner: 'artsy', repo: 'flare' })
    })
    done();
  });

  describe('#render', function() {

    it('renders the commits', function() {
      view.collection.reset([
        { commit: { message: 'Bump package.json version'} }
      ]);
      view.render();
      view.$el.html().should.containEql('Bump package.json version');
    });
  });

  describe('#changeRepo', function() {

    it('changes the repo and fetches', function() {
      sinon.stub(view.collection, 'fetch');
      view.$('.search-input').val('Garner').trigger('change');
      view.collection.repo.should.equal('Garner');
      view.collection.fetch.called.should.be.ok;
    });
  });
});
