//= require ./view

(function () {
  'use strict';

  var app = window.app;

  var _ = window._;
  var View = app.View;

  app.MainView = View.extend({
    el: '#main',

    initialize: function () {
      var self = this;
      app.socket.emit('boards', null, function (er, boards) {
        if (er) return console.error(er);
        var key = localStorage.getItem('board') || _.keys(boards)[0];
        self.render(boards[key] || _.first(boards));
      });
    },

    render: function (options) {
      View.prototype.render.apply(this, arguments);
      this.$el.empty();
      _.each(options.widgets, function (options) {
        var wrapper = new app.WidgetView(options);
        var ctor = app[_.str.classify(options.name) + 'WidgetView'];
        wrapper.$el.append((new ctor(options)).el);
        this.$el.append(wrapper.el);
      }, this);
      return this;
    }
  });
})();
