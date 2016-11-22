var morgan = require('morgan');
var bodyParser = require('body-parser');
// setup global middleware here
//  good idea to have middleware here when we have quite a few in large apps

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
