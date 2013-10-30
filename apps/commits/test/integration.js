var Browser = require('zombie')
  , integration = require('../../../test/helpers/integration');

describe('commits', function() {

  before(function(done) {
    integration.startServer(function() {
      done()
    });
  });
  
  after(function() {
    integration.closeServer();
  });

  it('displays the list of commits', function(done) {
    Browser.visit('http://localhost:5000', { debug: true }, function(err, browser) {
      browser.html().should.include('Adding a README');
      done();
    });
  });
});