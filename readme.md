## Node.js Job Queue

A job queue using Kue and persisted with Redis. Uses Express for routing.

### How It Works

It should:

* create a new job on the queue when a user makes a request to the API, and return the job ID to the user
* store the results in the queue when a job has completed
* send the results to a user when a request is made to a specific job ID, and that job has completed
* send state information when a request is made for a specific job and the job has NOT completed
* delete jobs from the queue once completed results have been delivered to the user


### REST API

**GET /api/?url=http://www.site.com**  Adds a new job to the job queue and sends back the job ID to the user

**GET /api/:id** Checks the status of a job and sends back results if job is complete; job state if job is incomplete.


### How to Install

1. Install Node.js
2. clone the node-job-queue repo link.
 ```$ git clone https://github.com/cl2205/node-job-queue.git
    $ cd node-job-queue
 ```
3. Run `npm install` to install dependencies
4. Make sure you have a redis-server running on your system.
3. Launch the app by running ```npm start``` in the root directory.
 ```$ npm start```

 The app will run on http://local host:3000.


### Test

#### Using POSTMAN
Using POSTMAN is recommended for its convenient request builder features, and it can also render HTML responses in their "Preview" option. Select GET method and add a 'url' parameter key to the API endpoint route. The composite URL will look like:

GET /api/ ```http://localhost:3000/api/?url=http://www.google.com```
GET /api/:id ```http://localhost:3000/api/1```

#### Using cURL

You can also just use curl  - just remember to escape the special characters.

``` $ curl http://localhost:3000/api\?url\=http://www.google.com ```


