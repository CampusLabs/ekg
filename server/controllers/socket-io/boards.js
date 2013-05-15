var config = require('../../config');

module.exports = function (client, data, cb) {
  try { cb(null, require(config.dir + '/boards.json')); }
  catch (er) { cb(er); }
};
