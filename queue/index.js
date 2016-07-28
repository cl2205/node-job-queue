'use strict';

const redis = require('redis');
const kue = require('kue');
const request = require('request');
const redisClient = redis.createClient();
const queue = kue.createQueue();

redisClient.on('connect', function() {
    console.log('Successfully connected to redis db at port 6379');
});

queue.watchStuckJobs(3000);

// Queue Events
queue
    .on('job enqueue', function(id, type) {
        processJob();
    })
    .on('job complete', function(id, result) {
        kue.Job.get(id, function(err, job) {
            if (!err) console.log("Job complete - results are stored in job.result");
        });
    })
    .on('error', function(err) {
        console.log('error occurred in queue: ', err);
    });


function processJob() {

    queue.process('new request', 20, function(job, done) {

      request.get(job.data.uri, function(error, response, body) {
          if (!error && response.statusCode === 200) {
              // done() stores body in job.result
              done(null, body);
          } else {
              return done(new Error(error));
          }
      });
  });
}

module.exports = queue;
