//= require ./model

(function () {
  'use strict';

  var node = typeof window === 'undefined';
  var app = node ? {} : window.app;

  var Model = node ? require('./model') : app.Model;

  var Endpoint = Model.extend({});

  Endpoint.Collection = Model.Collection.extend({
    model: Endpoint
  });

  node ? module.exports = Endpoint : app.Endpoint = Endpoint;
})();
