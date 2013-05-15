//= require ../view

(function () {
  'use strict';

  var app = window.app;

  var _ = window._;
  var View = app.View;

  app.GithubWidgetView = View.extend({
    name: 'github',

    initialize: function (options) {
      View.prototype.initialize.apply(this, arguments);
      this.model = new app.Model();
      this.collection = new app.Model.Collection();
      this.pollInterval = options.pollInterval;
      this.data = _.pick(options, 'url', 'qs');
      this.title = options.title;
      this.render();
      this.update();
    },

    update: function () {
      var self = this;
      app.socket.emit(this.name, this.data, function (er, data) {
        self.model.set(data);
        self.collection.set(data);
        self.timeout = _.delay(_.bind(self.update, self), self.pollInterval);
      });
    }
  });
})();
