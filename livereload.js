var connect  = require('connect');
var static = require('serve-static');

var server = connect();

server.use(static(__dirname + '/'));

server.listen(8010, function() {
  console.log('listening on port 8010')
});

var livereload = require('livereload');
var lrserver = livereload.createServer();
lrserver.watch(__dirname + "/");
