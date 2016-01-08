/* Create a job queue whose workers fetch data from a 
URL and store the results in a database.  The job queue should 
expose a REST API for adding jobs and checking their status / results */

var redis = require('redis');
var kue = require('kue');
var express = require('express');
var redisClient = redis.createClient();
var queue = kue.createQueue();
var request = require('request');

module.exports = queue;

redisClient.on('connect', function() {
    console.log('successfully connected to redis server at port 6379');
});


// Job processing, ideally with background workers in separate node processes. 
// I've kept it all in one for simplicity:
queue.process('new request', function(job, done) {
    // var jobResponse = JSON.stringify(job);

    request.get(job.data.uri, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // done() stores body in job.result
            done(null, body);
        } else {
            return done(new Error(error));
        }
    });
});

// Queue events

queue
    .on('job enqueue', function(id, type) {
        console.log('Job ', id, ' for ', type, ' has been added to queue');
    })
    .on('error', function(err) {
        console.log('error occurred in queue: ', err);
    })
    .on('job complete', function(id, result) {
        kue.Job.get(id, function(err, job) {
            if (!err) console.log("Job complete - results are store in job.result");
        });
    });

