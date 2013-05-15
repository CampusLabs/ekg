(function () {
  'use strict';

  var _ = window._;
  var app = window.app;
  var Backbone = window.Backbone;

  app.View = Backbone.View.extend({
    initialize: function () {
      Backbone.View.prototype.initialize.apply(this, arguments);
      this.views = {};
    },

    render: function () {
      Backbone.View.prototype.render.apply(this, arguments);
      if (this.template) this.$el.html(this.template(this));
      return this;
    },

    delegateEvents: function () {
      Backbone.View.prototype.delegateEvents.apply(this, arguments);
      _.invoke(this.views, 'delegateEvents');
      return this;
    },

    undelegateEvents: function () {
      Backbone.View.prototype.undelegateEvents.apply(this, arguments);
      _.invoke(this.views, 'undelegateEvents');
      return this;
    },

    remove: function () {
      Backbone.View.prototype.remove.apply(this, arguments);
      _.invoke(this.views, 'remove');
      return this;
    }
  }, {
    cached: function (options) { return this._cached || this.fresh(options); },

    fresh: function (options) {
      if (this._cached) this._cached.remove();
      return this._cached = new this(options);
    }
  });
})();
