var base = require('./base');
var config = require('../../server/config');
var _ = require('underscore');

module.exports = _.inherit(base, {
  baseURL: 'https://api.github.com',
  cacheExpiry: 30,
  name: 'github',

  requestHeaders: {
    'user-agent': 'ekg',
    authorization: 'token ' + require(config.dir + '/github').token
  }
});
