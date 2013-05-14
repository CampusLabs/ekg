//= require ./view

(function () {
  'use strict';

  var app = window.app;

  var _ = window._;
  var View = app.View;

  app.MainView = View.extend({
    el: '#main',

    initialize: function (options) {
      View.prototype.initialize.apply(this, arguments);

      _.each(options.widgets, function (options) {
        var widget = new app.Widget(options);
        widget.$el.append((new app[options.class](options)).el);
        this.$el.append(widget.el);
      }, this);
    }
  });
})();
