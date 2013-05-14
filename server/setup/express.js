var _ = require('underscore');
var config = require('../config');
var express = require('express');
var fs = require('fs');
var http = require('http');
var io = require('socket.io');

var app = express();
var server = http.createServer(app);
app.io = io.listen(server);
app.io.configure(config.env, function () {
  _.each(config.socketIo, function (val, key) { app.io.set(key, val); });
});

// Bind to port.
server.listen(config.server.port);

// All lower case and no trailing slashes allowed.
app.enable('case sensitive routing');
app.enable('strict routing');

// Don't show x-powered-by header for fewers bytes and increased security.
app.disable('x-powered-by');

// Set view engine up.
app.set('view engine', 'tmpl');
require('underscore-express')(app);

// Define middleware first.
require('../controllers/middleware')(app);

// Hook routes and controllers.
var files = fs.readdirSync(__dirname + '/../controllers');
var controllers = _.without(files, 'middleware', 'errors');
for (var i = 0, l = controllers.length; i < l; ++i) {
  if (controllers[i][0] === '.') continue;
  require('../controllers/' + controllers[i])(app);
}

// Make sure to require the error handlers last.
require('../controllers/errors')(app);
