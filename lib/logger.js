var logger = function() {};
var _ = require('underscore');

_.extend(logger.prototype, {
  log: function(name, label, msg) {
    console.log("[" + label + "] " + name);
    console.log("\t" + msg);
  }
});

module.exports = logger;
