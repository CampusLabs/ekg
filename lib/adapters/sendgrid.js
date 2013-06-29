var _ = require('underscore');
var ekg_config = require('../../server/config');
var config = require(ekg_config.dir + '/sendgrid');
var base = require('./base');

var SG = module.exports = _.inherit(base, {
  baseURL: 'https://sendgrid.com/api',
  name: 'sendgrid',
  cacheExpiry: 15,

  endpoint: function(url) {
    return [
      this.baseURL,
      url + '.get.json'
    ].join('/');
  },

  qs: function(qs) {
    return _.extend({}, qs || {}, {
      api_user: config.api_user,
      api_key: config.api_key
    });
  }
});

var sg = new SG();

sg.read({
  url: 'stats'
}, function(err, response) {
  console.log(response);
  // sg1.logJSON(response[0]);
});

