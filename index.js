var app = require('./server/server')

var port = 3000;
app.listen(port);
console.log('http://localhost:' + port + '/');
