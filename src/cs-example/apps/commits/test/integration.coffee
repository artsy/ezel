# 
# [Zombie](http://zombie.labnotes.org/) allows us to headlessly test our full
# project. The integration helper in /test/helpers/integration spawns our
# project server on a child process with test settings. The integration helper
# also creates a fake GitHub API server that we use in these integration tests.
# A headless browser combined with a fake GitHub API server makes these
# integration tests way faster, and less brittle, than your typical 
# Selenium-driven integration tests. However some might need true full-stack 
# integration tests, in this case it's suggested you try out 
# [Browserling](https://browserling.com/) or 
# [Karma](http://karma-runner.github.io/0.10/index.html).
#

Browser = require "zombie"
integration = require "../../../test/helpers/integration"

describe "commits", ->
  
  before (done) ->
    integration.startServer -> done()

  after ->
    integration.closeServer()

  it "displays the list of commits", (done) ->
    Browser.visit "http://localhost:5000", (err, browser) ->
      browser.html().should.include "Adding a README"
      done()