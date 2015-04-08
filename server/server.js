var http = require('http');

yaml = require('js-yaml');
fs = require('fs');

var doc;

try {
  doc = yaml.safeLoad(fs.readFileSync('./data/universe.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(JSON.stringify(doc));
}).listen(4000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:4000/');
