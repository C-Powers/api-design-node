// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

var jsonData = {count: 12, message: 'hey', hitCount: 0};

var express = require('express');
var app = express();
var path = require('path');


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/data', function(req,res){
  jsonData.hitCount++;
  res.json(jsonData);
});

var port = 3000;
app.listen(port, function() {
  console.log('Server started: http://localhost:' + port + '/');
});
