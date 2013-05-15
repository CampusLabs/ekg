var base = require('./base');
var config = require('../../server/config');
var request = require('request');
var _ = require('underscore');

module.exports = _.inherit(base, {
  baseURL: 'https://api.github.com',
  cacheExpiry: 30,
  name: 'github',
  token: require(config.dir + '/github').token,

  fetch: function (options, cb) {
    _.extend(options, {
      url: this.endpoint(options.url),
      headers: {
        'user-agent': 'ekg',
        authorization: 'token ' + this.token
      }
    });
    request(options, function (er, res, body) {
      if (er) return cb(er);
      cb(null, JSON.parse(body));
    });
  }
});
