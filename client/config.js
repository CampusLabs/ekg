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
    },
    grid: {
      width: 10,
      height: 10
    },
    widgets: [{
      class: 'ClockWidget',
      x: 0,
      y: 0,
      width: 2,
      height: 2
    }]
  };

  _.extend(app.config,
    env === 'production' ? {
    } : env === 'development' ? {
    } : {
    }
  );
})();
