const kue = require('kue');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const redis = require('redis');
const testRedisClient = redis.createClient();
const queue = require('../../queue');

describe('Job Queue', function() {
  var request, processJobSpy;

  before(function() {
    queue.testMode.enter(true);
  });

  beforeEach(function() {
    request = {
      get: sinon.spy()
    };
    processJobSpy = sinon.spy(queue, 'process');
  })

  afterEach(function() {
    queue.testMode.clear();
    processJobSpy.restore();
    testRedisClient.flushdb();
  });

  after(function() {
    queue.testMode.exit()
  });

  it('creates new jobs of "new request" type and adds them to queue', function() {
    queue.createJob('new request', { uri: 'http://testsite.com' }).save();
    queue.createJob('new request', { uri: 'http://abc.com' }).save();
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('new request');
    expect(queue.testMode.jobs[0].data).to.eql({ uri: 'http://testsite.com' });
  });

  it('processes jobs by making GET requests to urls', function() {

    queue.createJob('new request', { uri: 'http://testsite.com' }).save();

    expect(processJobSpy).calledOnce;
    expect(request.get).calledOnce;
  });
});
