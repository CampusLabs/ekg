var _ = require('underscore');

var events = {
  boards: require('./boards')
};

module.exports = function (app) {
  app.io.sockets.on('connection', function (client) {
    _.each(events, function (cb, event) {
      client.on(event, function () {
        cb.apply(this, [client].concat([].slice.call(arguments)));
      });
    });
  });
};
