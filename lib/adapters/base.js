var $redis = require('redis').client
  , _      = require('underscore');

var BaseAdapter = function(source_url) {
  this.source_url = source_url;
  return this;
}

_.extend(BaseAdapter.prototype, {
  fetch: function(cb) {
    var data = 'This is the new data';
    this.persist(data, cb);
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
        cb(null, 'This data exists');
      } else {
        // request data from source
        self.fetch(cb);
      }
    });
  },
  redisKey: function() {
    return this.name + ':' + 1;
  }
});

module.exports = BaseAdapter;
