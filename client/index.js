//= require async/lib/async
//= require jquery/jquery
//= require underscore/underscore
//= require underscore.string/lib/underscore.string
//= require underscore-inherit/underscore-inherit
//= require backbone/backbone
//= require dpr/dpr.js
//= requireSelf
//= require ./config
//= requireTree setup
//= requireTree ../models
//= requireTree ../views/jst
//= requireTree views

(function () {
  'use strict';

  var $ = window.jQuery;
  var Backbone = window.Backbone;
  var dpr = window.dpr;

  // Define global namespace
  var app = window.app = {
    ready: function () {
      $('html').addClass('dpr-' + dpr());
    }
  };

  // Run on DOM ready, build intial view
  $(app.ready);
})();
