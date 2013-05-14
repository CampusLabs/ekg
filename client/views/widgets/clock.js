//= require ../view

(function () {
  'use strict';

  var app = window.app;

  var _ = window._;
  var moment = window.moment;
  var View = app.View;

  app.ClockWidget = View.extend({
    className: 'clock-widget',
    template: window.jst['widgets/clock'],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.update();
    },

    update: function () {
      var now = moment();
      this.time = now.format('h:mm:ss');
      this.meridiem = now.format('a');
      this.date = now.format('dddd, MMM Do');
      this.render();
      this.timeout = _.delay(_.bind(this.update, this), 1000);
    }
  });
})();
