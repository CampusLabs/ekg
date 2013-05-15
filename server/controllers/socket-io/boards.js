var config = require('../../config');

module.exports = function (data, cb) {
  try { cb(null, require(config.dir + '/boards')); }
  catch (er) { cb(er); }
};
