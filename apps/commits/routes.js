// 
// Routes file that exports route handlers for ease of testing.
// 

var Commits = require('../../collections/commits');

exports.index = function(req, res, next) {
  var commits = new Commits(null, {
    owner: 'artsy',
    repo: 'flare'
  });
  commits.fetch({
    success: function() {
      res.locals.sd.COMMITS = commits.toJSON();
      res.render('index', { commits: commits.models });
    },
    error: function(m, err) { next(err.text); }
  });
};