(function () {
  'use strict';

  var _ = window._;
  var app = window.app;
  var path = 'http://localhost:8080';
  var env = !location.href.indexOf(path) ? 'development' : 'production';

  app.config = {
    env: env,
    server: {
      url: 'http://localhost:8080'
    }
  };

  _.extend(app.config,
    env === 'production' ? {
    } : env === 'development' ? {
    } : {
    }
  );
})();
