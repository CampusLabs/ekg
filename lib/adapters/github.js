var base    = require('./base')
  , request = require('request')
  , _       = require('underscore');

module.exports = _.inherit(base, {
  baseURL:     'https://api.github.com',
  cacheExpiry: 30,
  name:        'github',
  token:       require('../../config/tokens')['github'],

  fetch: function(query_obj, cb) {
    var self = this
      , request_params = {
          url:     self.endpoint(query_obj['url']),
          qs:      query_obj['qs'],
          headers: {
            'user-agent': 'ekg',
            Authorization: 'token ' + this.token
          }
        };

    request(request_params, function(error, response, body) {
      error ? self.log(error) : self.persist(query_obj, body, cb);
    });
  }
});
