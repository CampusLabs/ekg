var config = require('../config');
var redis = require('redis');
var url = require('url');

var parsed = url.parse(config.redis.url);
var port = parsed.port;
var host = parsed.hostname;
var auth = parsed.auth ? parsed.auth.split(':') : [];
var password = auth[1];
var db = (parsed.path || '').slice(1);
var client = redis.client = redis.createClient(port, host);
if (password) client.auth(password);
if (db) client.select(db);
