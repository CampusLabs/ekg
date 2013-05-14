(function () {
  'use strict';

  var Backbone = window.Backbone;

  var sync = Backbone.sync;

  Backbone.sync = function (method, model, options) {
    var success = options.success;
    var error = options.error;
    var cb = options.cb;

    options.success = function (res) {
      success.call(this, res);
      if (cb) cb(null, model, res, options);
    };

    options.error = function (er) {
      try { er.data = JSON.parse(er.responseText).error; } catch (e) {}
      if (!er.data) er.data = 'unable to connect';
      error.call(this, er);
      if (cb) cb(er, model, er.data, options);
    };

    return sync.call(this, method, model, options);
  };
})();
