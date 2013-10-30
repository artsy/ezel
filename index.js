var c = require('./config')
  , express = require('express')
  , setup = require('./lib/setup');

var app = module.exports = express();
setup(app);
app.listen(c.PORT, function() {
  console.log('Listening on port ' + c.PORT);
  if(process.send) process.send('listening');
});