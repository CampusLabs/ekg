(function () {
  'use strict';

  var $ = window.jQuery;
  var app = window.app;

  $.ajaxSetup({
    dataType: 'json',

    beforeSend: function (xhr, settings) {
      if (app.csrf || settings.type === 'GET') {

        // Set the X-CSRF-Token header and allow the request
        xhr.setRequestHeader('X-CSRF-Token', app.csrf);

        // Override the `error` callback to show the correct status
        if (settings.error) {
          var error = settings.error;
          settings.error = function (xhr) {
            if (xhr.statusText === 'error') xhr.status = 0;
            return error.apply(this, arguments);
          };
        }
        return;
      }

      // Otherwise retreive the CSRF token and try again
      $.ajax({
        url: app.config.serverUrl + '/csrf',
        complete: function (xhr) {
          if (xhr.status === 200) {
            app.csrf = xhr.responseText;
            $.ajax(settings);
            return;
          }
          if (settings.error) settings.error.apply(this, arguments);
          if (settings.complete) settings.complete.apply(this, arguments);
        }
      });

      // This cancels the initial request
      return false;
    }
  });
})();
