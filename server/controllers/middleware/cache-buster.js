module.exports = function (req, res, next) {

  // Thanks to super awesome iOS caching, we must ensure any dynamic responses
  // (anything beyond this point in the middleware) aren't cached.
  res.set('Cache-Control', 'no-cache');
  next();
};
