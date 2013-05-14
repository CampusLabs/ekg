//= require ./view

(function () {
  'use strict';

  var app = window.app;

  var View = app.View;

  app.Widget = View.extend({
    className: 'widget',

    initialize: function (options) {
      var xBox = (app.config.grid.width / 100) * 100;
      var yBox = (app.config.grid.height / 100) * 100;
      this.$el.css({
        top: (options.y * yBox) + '%',
        left: (options.x * xBox) + '%',
        width: (options.width * xBox) + '%',
        height: (options.height * yBox) + '%'
      });
    }
  });
})();
