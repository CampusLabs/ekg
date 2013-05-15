//= require ../view

(function () {
  'use strict';

  var app = window.app;

  var _ = window._;
  var View = app.View;

  app.GithubIssuesListItemView = View.extend({
    className: 'github-issue-list-item',
    template: window.jst['github-issue-list-item'],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.listenTo(this.model, {
        change: this.render,
        'change:assignee': this.updateAssignee,
        'change:labels': this.updateLabels,
        remove: this.remove
      });
      this.updateAssignee();
      this.updateLabels();
    },

    updateAssignee: function () {
      this.$el.toggleClass('js-not-assigned', !this.model.get('assignee'));
    },

    updateLabels: function () {
      this.$el
        .removeClass(_.pluck(this.model.previous('labels'), 'name').join(' '))
        .addClass(_.pluck(this.model.get('labels'), 'name').join(' '));
    }
  });
})();
