var base = require('./base');
var config = require('../../server/config');
var request = require('request');
var _ = require('underscore');
var info = require(config.dir + '/new_relic');
var xml2js = require('xml2js');

var NR = module.exports = _.inherit(base, {
  baseURL: 'https://api.newrelic.com',
  cacheExpiry: 30,
  name: 'new_relic',

  account_id: info.account_id,
  api_key: info.api_key,
  api_version: 'v1',
  app_id: info.app_id,

  fetch: function (options, cb) {
    _.extend(options, {
      url: this.endpoint(options.url),
      headers: {
        'x-api-key': this.api_key
      }
    });
    request(options, function (err, res, body) {
      if (err) return cb(err);
      xml2js.parseString(body, function(oerr, result) {
        cb(null, result);
      });
    });
  },

  endpoint: function(url) {
    return [
      this.baseURL,
      'api',
      this.api_version,
      'accounts',
      this.account_id,
      'applications',
      this.app_id,
      url + '.xml'
    ].join('/');
  }
});

