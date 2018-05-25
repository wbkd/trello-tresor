const nconf = require('nconf');
const defaults = require('../../defaults');

// read config hierarchically from:
nconf.argv()          // cli arguments
  .env({              // env variables
    separator: '__',  // separator for nested values
    lowerCase: true   // convert to lowercase
  })
  .file({file: 'config.json'})  // config.json file
  .defaults(defaults)             // fallback to the default
  .required(['api:key', 'api:token', 'api:list']);  // required fields

module.exports = nconf.get();
