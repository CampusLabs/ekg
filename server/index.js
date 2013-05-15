require('./setup')([
  'colors',
  'underscore',
  'backbone',
  'redis',
  'express'
]);

module.exports = {
  adapters: require('../lib/adapters')
};
