//
// Using ["The Twelve-Factor App"](http://12factor.net/) as a reference all 
// environment configuration will live in environment variables. This file 
// simply lays out all of those environment variables with sensible defaults 
// for development.
//

var ezelPort = process.env.EZEL_PORT;

if (!ezelPort) {
  throw new Error('You must set the EZEL_PORT env variable');
}

module.exports = {
  NODE_ENV: 'development',
  PORT: ezelPort,
  API_URL: 'https://api.github.com'
}

// Override any values with env variables
for(var key in module.exports) {
  module.exports[key] = process.env[key] || module.exports[key];
}
