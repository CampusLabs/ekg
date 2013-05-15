//= require async/lib/async
//= require jquery/jquery
//= require underscore/underscore
//= require underscore.string/lib/underscore.string
//= require underscore-inherit/underscore-inherit
//= require backbone/backbone
//= require dpr/dpr.js
//= require moment/moment
//= requireSelf
//= require ./config
//= requireTree setup
//= requireTree ../models
//= requireTree ../views/jst
//= requireTree views

(function () {
  'use strict';

  var $ = window.jQuery;

  // Define global namespace
  var app = window.app = {
    socket: window.io.connect(),

    ready: function () {
      $('html').addClass('dpr-' + window.dpr());
      app.mainView = new app.MainView();
    }
  };

  // Run on DOM ready, build intial view
  $(app.ready);
})();
