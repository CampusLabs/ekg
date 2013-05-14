(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var app = window.app;
  var Backbone = window.Backbone;

  app.View = Backbone.View.extend({
    constructor: function (options) {
      _.extend(this, options);
      Backbone.View.apply(this, arguments);
    },

    initialize: function () {
      Backbone.View.prototype.initialize.apply(this, arguments);
      this.views = {};
      this.on('page:in', this.pageIn);
      this.on('page:out', this.pageOut);
    },

    inputData: function () {
      return _.reduce(this.$('input'), function (data, el) {
        var $el = $(el);
        data[$el.attr('id').replace(/^js-|-field$/g, '')] = $el.val();
        return data;
      }, {});
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
    },

    pageIn: function () {
      _.invoke(this.views, 'trigger', 'page:in');
      if (this.autofocus) {
        this.$('input').each(function () {
          var $self = $(this);
          if (!$self.val()) return $self.focus() && false;
        });
      }
    },

    pageOut: function () { _.invoke(this.views, 'trigger', 'page:out'); }
  }, {
    cached: function (options) { return this._cached || this.fresh(options); },

    fresh: function (options) {
      if (this._cached) this._cached.remove();
      return this._cached = new this(options);
    }
  });
})();
