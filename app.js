var app      = require('http').createServer(handler),
    fs       = require('fs'),
    globals  = require('./lib/globals.js'),
    Grapher  = require('./lib/grapher.js'),
    _        = require('underscore')._;

function handler(req, res) {
  var rtn = [], grapher, url, options;
  
  // if the request if for a favicon, ignore it.
  if (req.url === '/favicon.ico') {
    res.end();
    return;
  }

  // if the root is requested then display instructions.
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./static/index.html', function (err, page) {
      if (err) throw err;
      res.end(page);
    });
    return;
  }

  // If the request didn't contain a query string then provide the
  // grapher with the path. Otherwise disect the query string.
  var args = require('url').parse(req.url, true).query;

  if (_.isEmpty(args)) {
    url = 'http:/' + req.url;
    options = {strict:true};
  } else {
    var urlBits = require('url').parse(args.q, true);
    
    if (urlBits.protocol) {
      url = urlBits.href;
    } else {
      url = "http://" + urlBits.href;
    }

    options = {strict:(args.strict !== undefined)};
  }

  Grapher.graph(url, options, function(graph) {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(graph.toJSON());
  });
}

app.listen(globals.APP_PORT, globals.APP_IP);

console.log('App @ http://' + globals.APP_IP + ':' + globals.APP_PORT);