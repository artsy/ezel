# 
# Route tests. Exporting the route handlers into their own function
# makes testing straightforward. Because Backbone.sync acts as our layer
# of abstraction over HTTP, we use [sinon](http://sinonjs.org/) to stub it
# and return fake API responses instead of testing against the actual GitHub
# API, which would be slow and unpredictable.
#

routes = require "../routes"
Backbone = require "backbone"
sinon = require "sinon"

describe "#index", ->

  beforeEach ->
    sinon.stub Backbone, "sync"
    @req = {}
    @res =
      render: sinon.stub()
      locals: sd: {}

  afterEach ->
    Backbone.sync.restore()

  it "fetches the artsy github commits and renders the index page", ->
    routes.index @req, @res
    Backbone.sync.args[0][1].url().should.include "/repos/artsy/flare/commits"
    Backbone.sync.args[0][2].success [message: "hi"]
    @res.render.args[0][0].should.equal "index"
    @res.render.args[0][1].commits[0].get("message").should.equal "hi"

