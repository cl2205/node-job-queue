/* Create a job queue whose workers fetch data from a 
URL and store the results in a database.  The job queue should 
expose a REST API for adding jobs and checking their status / results */

var redis = require('redis');
var kue = require('kue');
var express = require('express');
var redisClient = redis.createClient();
var queue = kue.createQueue();


module.exports = queue;

redisClient.on('connect', function() {
    console.log('Successfully connected to redis db at port 6379');
});


// Queue Events

queue
    .on('job enqueue', function(id, type) {
        console.log('Job ', id, ' for ', type, ' has been added to queue');
    })
    .on('job complete', function(id, result) {
        kue.Job.get(id, function(err, job) {
            if (!err) console.log("Job complete - results are store in job.result");
        });
    })
    .on('error', function(err) {
        console.log('error occurred in queue: ', err);
    });

