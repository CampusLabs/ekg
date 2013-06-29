var base = require('./base');
var ekg_config = require('../../server/config');
var _ = require('underscore');
var config = require(ekg_config.dir + '/new-relic');
var xml2js = require('xml2js');

module.exports = _.inherit(base, {
  baseURL: 'https://api.newrelic.com',
  name: 'new-relic',
  api_version: 'v1',

  endpoint: function(url) {
    return [
      this.baseURL,
      'api', this.api_version,
      'accounts', config.account_id,
      'applications', config.app_id,
      url + '.xml'
    ].join('/');
  },

  handleResponse: function(response, cb) {
    xml2js.parseString(response, function(err, result) {
      cb(null, result);
    });
  },

  requestHeaders: {
    'x-api-key': config.api_key
  }
});
