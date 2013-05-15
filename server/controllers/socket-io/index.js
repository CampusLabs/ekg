var _ = require('underscore');
var adapters = require('../../../lib/adapters');

var events = _.extend({
  boards: require('./boards')
}, _.reduce(adapters, function (obj, ctor, event) {
  var adapter = new ctor();
  obj[event] = _.bind(adapter.read, adapter);
  return obj;
}, {}));

module.exports = function (app) {
  app.io.sockets.on('connection', function (client) {
    _.each(events, function (cb, event) { client.on(event, cb); });
  });
};
