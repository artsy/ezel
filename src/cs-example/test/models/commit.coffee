#
# Test your Backbone model code like any other node modules.
#

Commit = require("../../models/commit")
Commits = require("../../collections/commits")

describe "Commit", ->

  beforeEach ->
    @commit = new Commit(sha: "qux")

  describe "#url", ->

    it "includes the owner and repo", ->
      @commit.collection = new Commits null,
        owner: "foo"
        repo: "bar"
      @commit.url().should.containEql "/repos/foo/bar/qux"