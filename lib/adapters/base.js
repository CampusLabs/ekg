var $redis = require('redis').client;
var _ = require('underscore')
var logger = require('../logger')
var request = require('request');

var BaseAdapter = function() {};

_.extend(BaseAdapter.prototype, {
  baseURL:     null,
  cacheExpiry: 10,
  logger:      new logger(),
  name:        null,

  endpoint: function(url) {
    return this.baseURL + url;
  },

  fetch: function (query_obj, cb) {
    var self = this;
    _.extend(query_obj, {
      url: this.endpoint(query_obj.url),
      headers: this.requestHeaders
    });
    request(query_obj, function (er, res, body) {
      if (er) return cb(er);
      self.handleResponse(body, cb);
    });
  },

  // REVIEW: Do more than log?
  error: function(msg) {
    this.logger.log(this.name, 'error', msg);
  },

  log: function(msg) {
    this.logger.log(this.name, 'info', msg);
  },

  handleResponse: function(response, cb) {
    cb(null, JSON.parse(response));
  },

  persist: function(query_obj, data, cb) {
    var key = this.redisKey(query_obj);
    this.log('PERSISTING: ' + key);
    $redis.setex(key, this.cacheExpiry, data, function(err, response) {
      err ? cb(err) : cb(null, data);
    });
  },

  read: function(query_obj, cb) {
    var self = this
      , key = this.redisKey(query_obj);

    $redis.get(key, function(err, reply) {
      if (err) {
        cb(err);
      } else if (reply) {
        self.log('SERVING: ' + key);
        cb(null, reply);
      } else {
        self.log(query_obj);
        self.fetch(query_obj, cb);
      }
    });
  },

  redisKey: function(query_obj) {
    return [
      this.name,
      this.endpoint(query_obj['url']),
      JSON.stringify(query_obj['qs'])
    ].join(':');
  },

  requestHeaders: {}
});

module.exports = BaseAdapter;
