//= require ./view

(function () {
  'use strict';

  var app = window.app;

  var View = app.View;

  app.WidgetView = View.extend({
    className: 'widget',

    initialize: function (options) {
      this.$el.css({
        top: options.y + '%',
        left: options.x + '%',
        width: options.width + '%',
        height: options.height + '%'
      });
    }
  });
})();
