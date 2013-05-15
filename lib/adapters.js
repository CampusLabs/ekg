module.exports = {
  github: require('./adapters/github')
};

function get_adapter(name, url) {
  return new module.exports[name](url);
}

var g_adapter = get_adapter('github', 'https://github.com');

g_adapter.read(function(err, response) {
  console.log(response);
});
