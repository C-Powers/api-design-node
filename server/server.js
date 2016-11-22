var express = require('express');
var app = express();
var api = require('./api/api'); //  this is a router
var err = require('./middleware/err')
// setup the app middlware
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api', api);

app.use(err());

// export the app for testing
module.exports = app;
