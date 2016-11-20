'use strict'

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

lionRouter.route('/')
  .get(function(req, res) {
    res.json(lions);
  })
  .post(updateId, function(req, res) {
    var lion = req.body;
    lions.push(lion);
    res.json(lion);
  });


lionRouter.route('/:id')
  .get(function(req, res){
    console.log(req.lion, "a lion")
    var lion = req.lion;
    res.json(lion || {});
  })
  .delete(function(req, res) {
    var lion = _.findIndex(lions, {id: req.params.id});
    lions.splice(lion, 1);

    res.json(req.lion);
  })
  .put(function(req, res) {
    var update = req.body;
    if (update.id) {
      delete update.id
    }

    var lion = _.findIndex(lions, {id: req.params.id});
    if (!lions[lion]) {
      res.send();
    } else {
      var updatedlion = _.assign(lions[lion], update);
      res.json(updatedlion);
    }
  });

module.exports = lionRouter;
