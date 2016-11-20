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

  var lion = {
    name: 'Mufasa',
    age: 100,
    pride: 'Evil Lions',
    gender: 'male'
  }

  it('should create a create a new lion', function(done) {
    request(app)
      .post('/lions')
      .send(lion)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('object');
        done();
      })
  });

  it('should get a single lion', function(done) {
    request(app)
      .post('/lions')
      .send(lion)
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var singleLion = resp.body;
        request(app)
          .get('/lions/' + singleLion.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(singleLion);
            done();
          });
      })
  });

  it('should delete a lion', function(done){
    request(app)
      .post('/lions')
      .send(lion)
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var deleteLion = resp.body;
        request(app)
          .delete('/lions/' + deleteLion.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(deleteLion);
            done();
          });
      })
  });

  it('should update a lion', function(done){
    request(app)
      .post('/lions')
      .send(lion)
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var updateLion = resp.body;
        request(app)
          .put('/lions/' + updateLion.id)
          .send({name: 'Scar'})
          .end(function(err, resp) {
            expect(resp.body.name).to.eql('Scar');
            done();
          })
      })
  });

});
