//= require ../view

(function () {
  'use strict';

  var app = window.app;

  var View = app.View;

  app.GithubIssuesListItemView = View.extend({
    className: 'github-issue-list-item',
    template: window.jst['github-issue-list-item'],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.listenTo(this.model, {
        change: this.render,
        remove: this.remove
      });
    },

    render: function () {
      this.$el.toggleClass('js-not-assigned', !this.model.get('assignee'));
      return View.prototype.render.apply(this, arguments);
    }
  });
})();
