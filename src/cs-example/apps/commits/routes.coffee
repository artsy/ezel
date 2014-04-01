# 
# Routes file that exports route handlers for ease of testing.
#

Commits = require "../../collections/commits"

@index = (req, res, next) ->
  commits = new Commits null,
    owner: "artsy"
    repo: "flare"
  commits.fetch
    success: ->
      res.locals.sd.COMMITS = commits.toJSON()
      res.render "index", commits: commits.models
    error: (m, err) -> next err.text