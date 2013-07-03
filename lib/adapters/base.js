var _ = require('underscore')
var logger = require('../logger')
var request = require('request');
var $redis = require('redis').client;

var BaseAdapter = function() {};

_.extend(BaseAdapter.prototype, {
  baseURL:     null,
  cacheExpiry: 10,
  logger:      new logger(),
  name:        null,

  buildRequest: function(query_obj) {
    return _.extend({}, {
      url:     this.endpoint(query_obj.url),
      qs:      this.qs(query_obj.qs),
      headers: this.requestHeaders
    });
  },
  endpoint: function(url) {
    return this.baseURL + url;
  },

  // REVIEW: Do more than log?
  error: function(msg) {
    this.logger.log(this.name, 'error', msg);
  },

  fetch: function (requestParams, cb) {
    var self = this;
    request(requestParams, function(err, res, body) {
      if (err) {
        self.error(err);
        cb(err);
      } else {
        self.parse(body, function(data) {
          self.persist(requestParams, data, cb);
        });
      }
    });
  },

  parse: function(response, cb) {
    cb(JSON.parse(response));
  },

  log: function(msg) {
    this.logger.log(this.name, 'info', msg);
  },

  logJSON: function(json) {
    this.log(JSON.stringify(json));
  },

  persist: function(requestParams, data, cb) {
    var self = this;
    var key = this.redisKey(requestParams);

    this.log('PERSISTING: ' + key);

    $redis.setex(key, this.cacheExpiry, data, function(err, response) {
      if (err) {
        self.error(err);
        cb(err);
      } else {
        cb(null, data);
      }
    });
  },

  qs: function(qs) {
    return qs || {};
  },

  read: function(query_obj, cb) {
    var self = this;
    var requestObject = this.buildRequest(query_obj);
    this.logJSON(requestObject);
    var key = this.redisKey(requestObject);
    // this.log(key);
    $redis.get(key, function(err, reply) {
      if (err) {
        cb(err);
      } else if (reply) {
        self.log('SERVING: ' + key);
        cb(null, reply);
      } else {
        self.fetch(requestObject, cb);
      }
    });
  },

  redisKey: function(requestParams) {
    var key = [
      this.name,
      requestParams.url,
      JSON.stringify(requestParams.qs)
    ].join(':')
    return key;
  },

  requestHeaders: {}
});

module.exports = BaseAdapter;
