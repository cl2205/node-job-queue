/* Worker Process that fetches data from URL and stores the results in the queue.
   For this simple use case, we're using the worker in the same node process 
   as the web process and focusing on the job queue. In a more complex use case
   we might want to use a Node cluster module to spin up several workers/child processes 
   that run in the background and consume jobs on the queue in separate processes. */
   
var queue = kue.createQueue();
var request = require('request');

queue.process('new request', function(job, done) {

    request.get(job.data.uri, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // done() stores body in job.result
            done(null, body);
        } else {
            done(new Error(error));
        }
    });
});