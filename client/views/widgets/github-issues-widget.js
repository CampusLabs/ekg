//= require ./github-widget

(function () {
  'use strict';

  var app = window.app;

  var GithubWidgetView = app.GithubWidgetView;

  app.GithubIssuesWidgetView = GithubWidgetView.extend({
    className: 'github-issues-widget',
    template: window.jst['github-issue-widget'],

    initialize: function () {
      GithubWidgetView.prototype.initialize.apply(this, arguments);
      this.views.list = new app.ListView({
        collection: this.collection,
        modelView: app.GithubIssuesListItemView,
        el: this.$('.list')
      });
    }
  });
})();
