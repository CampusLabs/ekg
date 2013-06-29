var _ = require('underscore');
var xml2js = require('xml2js');
var ekg_config = require('../../server/config');
var config = require(ekg_config.dir + '/new_relic');
var base = require('./base');

var NR = module.exports = _.inherit(base, {
  baseURL: 'https://api.newrelic.com',
  name: 'new_relic',
  api_version: 'v1',
  cacheExpiry: 20,

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
    var self = this;
    xml2js.parseString(response, function(err, result) {
      if (err) {
        self.error(err);
      } else {
        cb(result);
      }
    });
  },

  requestHeaders: {
    'x-api-key': config.api_key
  }
});

var nr = new NR();

nr.read({
  url: 'threshold_values'
}, function(err, response) {
  console.log(response);
  // nr.logJSON(response[0])//['threshold-values']['threshold_value']);
});
