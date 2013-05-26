var $redis = require('redis').client
  , _      = require('underscore')
  , logger = require('../logger');

var BaseAdapter = function() {};

_.extend(BaseAdapter.prototype, {
  baseURL:     null,
  cacheExpiry: 10,
  logger:      new logger(),
  name:        null,

  endpoint: function(url) {
    return this.baseURL + url;
  },

  fetch: function(query_obj, cb) {
    this.log('FETCHING DATA');
    var data = 'data returned from API call';
    this.persist(query_obj, data, cb);
  },

  log: function(msg) {
    this.logger.log(msg);
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
  }
});

module.exports = BaseAdapter;
