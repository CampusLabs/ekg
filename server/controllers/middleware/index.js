var config = require('../../config');
var express = require('express');

module.exports = function (app) {

  // ## Vendor Middleware
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.cookieSession(config.session));
  app.use(express.csrf());
  app.use(express.static(__dirname + '/../../../public'));

  // ## App Middleware
  app.use(require('./cache-buster'));
  app.use(require('./template-helpers'));
  app.use(require('./url-normalizer'));
};
