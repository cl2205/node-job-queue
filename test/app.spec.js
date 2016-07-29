const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const redis = require('redis');
const testRedisClient = redis.createClient();
const queue = require('../queue');

beforeEach(function() {
  testRedisClient.flushdb();
})

describe('GET /api?siteURL', function() {
  it('should respond with job ID and message in json response', function(done) {

    request(app)
      .get('/api?url=http://www.google.com')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).to.be.a('number');
        expect(res.body.message).to.contain('A new job has been added to the queue with job id: ', res.body.id);
        done();
      });
  });
});

describe('GET /api/:id', function() {
  it('should respond with json response or html text', function(done) {
    var id;
    request(app)
      .get('/api?url=http://www.google.com')
      .end((err, res) => {
        request(app)
          .get('/api/1')
          .expect('Content-Type', 'application/json; text/html; charset=utf-8')
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.satisfy(function(body) {
              return typeof body === 'object' || typeof body === 'string';
            });
            done();
          });
      });
  });
})
