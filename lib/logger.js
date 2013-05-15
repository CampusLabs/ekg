var logger = function() {};
var _ = require('underscore');

_.extend(logger.prototype, {
  log: function(msg) {
    console.log(">>>> " + msg + " <<<<");
  }
});

module.exports = logger;
