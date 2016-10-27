var lionRouter = require('express').Router();
var _ = require('lodash');

var lions = [
  {"name": "test lion",
  "id": 1,
  "age": 1,
  "pride": "testers",
  "gender": "female"
  },
  {"name": "test lion2",
  "id": 2,
  "age": 2,
  "pride": "testers",
  "gender": "male"
  }
];

var id = 0;
var updateId = function(req, res, next) {
  // fill this out. this is the route middleware for the ids
  // add id to req.body
  if(!req.body.id) {
    if(lions.length == 0 ) {
      id = 0;
      id++;
    } else {
      id = lions.length;
      id++;
    }
    req.body.id=id + '';
  }
  next();
};

lionRouter.param('id', function(req, res, next, id) {
  lions.map(function(lion) {
    if(lion.id == req.params.id) {
      req.lion=lion;
      next();
    }
  });

  if(!req.lion){
    res.send("Do you have a lion with that id?")
  }
});

lionRouter.get('/lions', function(req, res){
  res.json(lions);
});

lionRouter.get('/lions/:id', function(req, res){
  console.log(req.lion, "a lion")
  lion = req.lion;
  res.json(lion || {});
});

lionRouter.post('/lions', updateId, function(req, res) {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});

lionRouter.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});


module.exports = lionRouter;
