#!/usr/bin/env node
// producer file

var express = require('express');
var app = express();
var server = require('http').createServer(app); // Attach the Express app
var kue = require('kue');
var queue = require('./queue/index.js');


server.listen(3000, function() {
    console.log('Server listening on port 3000');
});

// adds new jobs to queue
app.get('/api/', function(req, res, next) {
   
    var job = queue.create('new request', {uri: req.query.url});

    job.attempts(3).save(function(err) {
        if (err) console.log(err);

        var message = 'A new job has been added to the queue with job id: ' + job.id + '. Check your job status at http://localhost:3000/api/' + job.id;
        var data = {
            id: job.id,
            message: message
        };
        
        res.send(data);

    });
 });


app.get('/api/:id', function(req, res, next) {

    var id = req.params.id;

    kue.Job.get(id, function(err, job) {
        if (err) console.log(err);

        if (!job) {

            res.send('No such job found in queue');

        // job is not complete - send current status
        } else if (!job.result) {

            var currentState = job.state();
            var status = {
                id: job.id,
                state: currentState,
                message: 'Job state is currently: ' + job.state()
            };

            res.send(status);

        // job is complete - send results and remove job from queue
        } else {

            var result = job.result;
            var state = job.state();
    
            job.remove(function(err) {
                // remove job from queue
                if (!err) console.log('removed completed job #%d, job.id');
                res.send(result);
            });
        }
    });

});


// catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

module.exports = app;
