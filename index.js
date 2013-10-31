// 
// Main app file that runs setup code and starts the server process.
// This code should be kept to a minimum. Any setup code that gets large should 
// be abstracted into modules under /lib.
// 

var c = require('./config')
  , express = require('express')
  , setup = require('./lib/setup');

var app = module.exports = express();
setup(app);

// Start the server and send a message to IPC for the integration test 
// helper to hook into. 
app.listen(c.PORT, function() {
  console.log('Listening on port ' + c.PORT);
  if(process.send) process.send('listening');
});