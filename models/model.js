(function () {
  'use strict';

  var node = typeof window === 'undefined';
  var app = node ? {} : window.app;

  var _ = node ? require('underscore') : window._;
  var Backbone = node ? require('backbone') : window.Backbone;

  var Model = Backbone.Model.extend({});

  Model.Collection = Backbone.Collection.extend({
    model: Model,

    url: function () {
      return _.result(this.model.prototype, 'urlRoot');
    }
  });

  node ?  module.exports = Model : app.Model = Model;
})();
