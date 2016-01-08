var queue = require('./queue/index.js');
var chai = require('chai');
var expect = chai.expect;


describe('Job Queue', function() {

    before(function() {
      queue.testMode.enter();
    });

    // beforeEach(function() {
    //   queue.createJob('new request', 'http://www.google.com');
    //   queue.createJob('new request', 'http://www.gmail.com');
    // });

    afterEach(function() {
      queue.testMode.clear();
    });

    after(function() {
      queue.testMode.exit();
    });

    it ('should add new jobs to the queue', function() {

      queue.createJob('http://www.google.com');
      queue.createJob('http://www.gmail.com');

      expect(queue.testMode.jobs.length).to.equal(2);
      expect(queue.testMode.jobs[0].type).to.equal('new request');
      expect(queue.testMode.jobs[0].id).to.eql('1');

    });

    it ('should return the job id when a new job is enqueued', function(done) {

        queue.createJob('http://www.google.com', function(result) {
            console.log("RESULT: ", result);
            expect(result).to.equal(queue.testMode.jobs[0].id);
            done();
        });

        // var result = queue.createJob('http://www.google.com');
        // expect(result).to.equal(queue.testMode.jobs[0].id);
        // done();

    });

    xit ('should store the results when a job has completed', function() {

    });

    xit ('should send results if requested by user and job status is complete', function() {

    });

    xit ('should send job status if requested and job is not complete', function() {

    });

    xit ('should remove jobs from the queue when the response has been sent back to the user', function() {

    });


});




