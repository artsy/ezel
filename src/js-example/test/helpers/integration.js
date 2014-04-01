//
// Integration test helper that makes it easy to write fast integration tests.
// One of the ways it does this is by providing the methods `startServer` and
// `closeServer` that will spawn a child process of this project. This means
// a version of this project server will run on localhost:5000 using a fake
// API server exposed below a `api`.
//

var spawn = require('child_process').spawn,
    express = require('express'),
    child;

// Fake API server currently stubbing responses from GitHub's API.
// You will want to edit this to stub your own API's behavior.
var api = module.exports.api = express()

api.get('/repos/:owner/:repo/commits', function(req, res) {
  res.send([
    { commit: { message: 'Adding a README.md' } }
  ]);
});

// Spawns a child process with ENV variables that will launch it in "test"
// mode. This includes an API_URL that points to the fake API server mounted
// under /__api.
startServer = module.exports.startServer = function(callback) {
  if (child) return callback();
  var envVars  = {
    NODE_ENV: 'test',
    API_URL: 'http://localhost:5000/__api',
    PORT: 5000
  };
  for(var k in process.env) {
    if(!envVars[k]) envVars[k] = process.env[k];
  };
  child = spawn('make', ['s'], {
    customFds: [0, 1, 2],
    stdio: ['ipc'],
    env: envVars
  });
  child.on('message', function() { callback() });
  child.stdout.on('data', function(data) {
    console.log(data.toString());
  });
}

// Closes the server child process, used in an `after` hook and on
// `process.exit` in case the test suite is interupted.
closeServer = module.exports.closeServer = function() {
  if(child) child.kill();
  child = null;
}
process.on('exit', closeServer);

// You can debug your integration app and run this app server by running
// this module directly and opening up localhost:5000.
// e.g. `node test/helpers/integration.js`
if(module != require.main) return;
startServer(function() {
  child.stdout.on('data', function(data) {
    console.log(data.toString());
  });
});