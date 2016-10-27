// TODO: user app.params to find the lion using the id
// and then attach the lion to the req object and call next. Then in
// '/lion/:id' just send back req.lion

// create a middleware function to catch and handle errors, register it
// as the last middleware on app


// create a route middleware for POST /lions that will increment and
// add an id to the incoming new lion object on req.body

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

//var lions = [];
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

app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.param('id', function(req, res, next, id) {
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

app.get('/lions', function(req, res){
  res.json(lions);
});

app.get('/lions/:id', function(req, res){
  console.log(req.lion, "a lion")
  lion = req.lion;
  res.json(lion || {});
});

app.post('/lions', updateId, function(req, res) {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});

app.put('/lions/:id', function(req, res) {
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

app.use(function(err,req,res,next) {
  if(err) {
    res.status(500).send(err);
  }
})

app.listen(3000);
console.log('on port 3000');


/*
  our middleware:
  cb = [
  morgan,
  express,
  bp1,
  bp2,
  param,
  [get, get, post, put],
  error
]


*/
