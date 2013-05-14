var Backbone = require('backbone');
var redis = require('redis');

// Custom sync for PostgreSQL.
Backbone.sync = function (method, model, options) {
  // TODO: Set up sync for redis (maybe not necessary);
  var client = redis.client;
};
