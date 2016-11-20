'use strict'
//  testing file
var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

//  TODO: make test for the other CRUD routes
//  DELETE, UPDATE, POST, GET one
//  to run the test type mocha server/specs.js

describe('[LIONS]', function () {
  it('should get all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json') /* this sets the headers*/
      .expect('Content-Type', /json/) /*method expect from supertest*/
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array'); /* function expect from chai - see require()*/
        done();
      })
  });
});
