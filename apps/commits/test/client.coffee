# 
# Tests for the client-side code of the commits app. Because 
# [Browserify](https://github.com/substack/node-browserify) allows us to 
# write our client-side in modules, testing becomes a lot easier. There are
# still some obstacles to unit testing client-side code such as not having
# a DOM available. In this case we use [benv](https://github.com/artsy/benv)
# to create a more suitable environment for unit testing client-side code in
# node.js.
# 

benv = require("benv")
sinon = require("sinon")
Commits = require("../../../collections/commits")
resolve = require("path").resolve

# Tells Benv to expose jquery as a global because our code depends on it. 
benv.globals = ->
  $: require("components-jquery")

describe "CommitsView", ->
  
  # In this before hook we setup our browser environemnt using
  # [benv](https://github.com/artsy/benv). This and the above `benv.globals=`
  # may be refactored into a /test/helpers/client module to DRY up
  # some setup. For this example we keep it simple.
  before (done) ->
    benv.setup =>
      benv.render resolve(__dirname, "../templates/index.jade"),
        sd: {}
        sharifyScript: ->
        commits: new Commits([], { owner: "foo", repo: "bar" }).models
      , =>
        @CommitsView = benv.requireWithJadeify(
          "../client.coffee",
          ["listTemplate"]
        ).CommitsView
        done()

  beforeEach (done) ->
    @view = new @CommitsView
      el: 'body'
      collection: new Commits [], { owner: "artsy", repo: "flare" }
    done()

  afterEach ->
    benv.teardown()

  describe "#render", ->

    it "renders the commits", ->
      @view.collection.reset [commit: { message: "Bump package.json version" }]
      @view.render()
      @view.$el.html().should.include "Bump package.json version"

  describe "#changeRepo", ->
    
    it "changes the repo and fetches", ->
      sinon.stub @view.collection, "fetch"
      @view.$("#commits-repo-input").val("Garner").trigger "change"
      @view.collection.repo.should.equal "Garner"
      @view.collection.fetch.called.should.be.ok
