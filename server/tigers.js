'use strict'
// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for tigers
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server
var tigerRouter = require('express').Router();
var _ = require('lodash');

var tigers = [
  {"name": "test tiger",
  "id": 1,
  "age": 1,
  "pride": "testers",
  "gender": "female"
  },
  {"name": "test tiger2",
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
    if(tigers.length == 0 ) {
      id = 0;
      id++;
    } else {
      id = tigers.length;
      id++;
    }
    req.body.id=id + '';
  }
  next();
};

tigerRouter.param('id', function(req, res, next, id) {
  tigers.map(function(tiger) {
    if(tiger.id == req.params.id) {
      req.tiger=tiger;
      next();
    }
  });

  if(!req.tiger){
    res.send("Do you have a tiger with that id?")
  }
});

/*
  This is a way to combined all routes into one,
  with their respective HTTP verbs.
  The old way is shown below, commented out.
*/

tigerRouter.route('/')
  .get(function(req, res) {
    console.log('------ rawr, tigers! ------')
    res.json(tigers);
  })
  .post(updateId, function(req, res) {
    var tiger = req.body;
    tigers.push(tiger);
    res.json(tiger);
  });


tigerRouter.route('/:id')
  .get(function(req, res){
    console.log(req.tiger, "a tiger")
    tiger = req.tiger;
    res.json(tiger || {});
  })
  .delete(function(req, res) {
    var tiger = _.findIndex(tigers, {id: req.params.id});
    tigers.splice(tiger, 1);

    res.json(req.tiger);
  })
  .put(function(req, res) {
    var update = req.body;
    if (update.id) {
      delete update.id
    }

    var tiger = _.findIndex(tigers, {id: req.params.id});
    if (!tigers[tiger]) {
      res.send();
    } else {
      var updatedtiger = _.assign(tigers[tiger], update);
      res.json(updatedtiger);
    }
  });


/*
tigerRouter.get('/', function(req, res){
  console.log('------ rawr, tigers! ------')
  res.json(tigers);
});

tigerRouter.get('/:id', function(req, res){
  console.log(req.tiger, "a tiger")
  tiger = req.tiger;
  res.json(tiger || {});
});

tigerRouter.post('/', updateId, function(req, res) {
  var tiger = req.body;

  tigers.push(tiger);

  res.json(tiger);
});

tigerRouter.put('/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var tiger = _.findIndex(tigers, {id: req.params.id});
  if (!tigers[tiger]) {
    res.send();
  } else {
    var updatedtiger = _.assign(tigers[tiger], update);
    res.json(updatedtiger);
  }
});
*/
module.exports = tigerRouter;
