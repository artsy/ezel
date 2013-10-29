module.exports = {
	NODE_ENV: 'development',
  PORT: 4000,
  API_URL: 'https://api.github.com',
  SESSION_SECRET: 'sesson-secret-to-be-overwritten-by-env-var'
}

// Override any values with env variables
for(var key in exports) { exports[key] = process.env[key] || exports[key] }