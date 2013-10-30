var spawn = require('child_process').spawn
  , express = require('express')
  , child;

var api = module.exports.api = express()

api.get('/repos/:owner/:repo/commits', function(req, res) {
  res.send([
    { commit: { message: 'Adding a README.md' } }
  ]);
});

startServer = module.exports.startServer = function(callback) {
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
  if(!callback) callback = function(){};
  child.on('message', callback);
  child.stdout.on('data', function(data) {
    console.log(data.toString());
  });
}

closeServer = module.exports.closeServer = function() {
  if(child) child.kill();
  child = null;
}

process.on('exit', closeServer);