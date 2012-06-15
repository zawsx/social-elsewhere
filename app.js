var app      = require('http').createServer(handler),
    _        = require('underscore')._,
    globals  = require('./globals.js'),
    graphMod = require('./grapher.js');

function handler(req, res) {
  var rtn = [], grapher;

  if (req.url === '/favicon.ico') {
    return;
  }

  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<p>Type in a domain and path into the address bar e.g.</p>'+
      '<pre>http://thiswebsite.com/twitter.com/ac94</pre>' +
      '<p>The result will be returned as JSON</p>');
    return;
  }

  grapher = new graphMod.Grapher();

  grapher.buildGraph('http:/'+req.url).then(function(obj) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(obj));
  });
}

app.listen(globals.APP_PORT, globals.APP_IP);

console.log('App @ http://' + globals.APP_IP + ':' + globals.APP_PORT);