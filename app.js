#!/usr/bin/env node
'use strict';

const express = require('express');
const app = express();

// Start server and attach the Express app
const server = require('http').createServer(app);
const kue = require('kue');
const queue = require('./queue');
const port = process.env.PORT || 3000;

server.listen(3000, function() {
    console.log('server listening at port', port);
});

// Kue Status-Checker UI
app.use('/queue', kue.app);

// add new job to queue
app.get('/api', function(req, res, next) {

    var job = queue.create('new request', {uri: req.query.url});

    job.attempts(3).save(function(err) {
        if (err) next(err);
        else {
          var message = 'A new job has been added to the queue with job id: ' + job.id + '. Check your job status at http://localhost:3000/queue or http://localhost:3000/api/' + job.id;
          var data = {
              id: job.id,
              message: message
          };

          res.send(data);
        }
    });
 });

// get status/results of job
app.get('/api/:id', function(req, res, next) {

    kue.Job.get(req.params.id, function(err, job) {
        if (err) next(err);

        else if (!job) {
            res.send('No such job found in queue');
        }

        else if (!job.result) {
            var status = {
                id: job.id,
                state: job.state(),
                message: 'Job state is currently: ' + job.state()
            };
            res.send(status);

        // job is complete
        } else {
            job.remove(function(err) {
                if (err) next(err);
                res.send(job.result);
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
