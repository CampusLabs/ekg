var $redis = require('redis').client
  , _      = require('underscore')
  , logger = require('../logger');

var BaseAdapter = function(source_url) {
  this.source_url = source_url;
  this.logger     = new logger();
  return this;
}

_.extend(BaseAdapter.prototype, {
  fetch: function(cb) {
    this.log('FETCHING DATA');
    var data = 'data returned from API call';
    this.persist(data, cb);
  },
  log: function(msg) {
    this.logger.log(msg);
  },
  persist: function(data, cb) {
    $redis.setex(this.redisKey(), 5, data, function(err, response) {
      err ? cb(err) : cb(null, data);
    });
  },
  read: function(cb) {
    var self = this;
    $redis.get(self.redisKey(), function(err, reply) {
      if (err) {
        cb(err);
      } else if (reply) {
        self.log('DATA IN REDIS');
        cb(null, reply);
      } else {
        self.fetch(cb);
      }
    });
  },
  redisKey: function() {
    return this.name + ':' + 1;
  }
});

module.exports = BaseAdapter;
