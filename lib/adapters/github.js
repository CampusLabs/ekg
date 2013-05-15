var base = require('./base')
  , api  = require('github')
  , _    = require('underscore');

var github = new api({
  version: "3.0.0"
});

module.exports = _.inherit(base, {
  name: 'github'
});
