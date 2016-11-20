'use strict'
// TODO: mount the tigers route with a a new router just for tigers
// exactly like lions below

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var lionRouter = require('./lions');
var tigerRouter = require('./tigers');

app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
We can make our own middleware SUPER easily.
This is a tack on to what morgan does.
What we see in the nodemon console is morgan logging
some useful info. What if we wanted to log the POSTed body?
*/

app.use(function (req, res, next) {
  console.log("-- the body -- ", req.body);
  next();
})


// this is called mounting. when ever a req comes in for
// '/lion' we want to use this router
app.use('/lions', lionRouter)
app.use('/tigers', tigerRouter)

app.use(function(err, req, res, next) {
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

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
