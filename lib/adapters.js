module.exports = {
  github: require('./adapters/github')
};

function get_adapter(name, url) {
  return new module.exports[name](url);
}

var g_adapter = get_adapter('github');

g_adapter.read({
  url: '/repos/orgsync/orgsync/issues',
  qs: { labels: 'critical' }
}, function(err, response) {
  console.log(response);
});
