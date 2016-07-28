# Node Job Queue

A job queue for Node.js using Kue and persisted with Redis. Uses Express for routing.

## How It Works

The queue should be able to:

* create a new job on the queue when a user makes a request to the API, and return the job ID to the user
* store the results in the queue when a job has completed
* send the results to a user when a request is made to a specific job ID, and that job has completed
* send state information when a request is made for a specific job and the job has NOT completed
* delete jobs from the queue once completed results have been delivered to the user

### How to Install

1. Install [Node.js](https://nodejs.org/en/) and redis

  ```$ brew install redis```

2. Clone the node-job-queue repo link.

 ```$ git clone https://github.com/cl2205/node-job-queue.git```

 ```$ cd node-job-queue```

3. Run `npm install` to install dependencies.
4. Have a redis-server running on your system

 ```$ redis-server```

5. Launch the app by running ```npm start``` in the project's root directory.

  ```$ npm start```

 The app will run on http://localhost:3000.

### REST API Endpoints

 * **GET http://localhost:3000/api?url=http://www.site.com**  
   Adds a new job to the job queue and sends back the job ID to the user

 * **GET http://localhost:3000/api/:id** <br>
    Checks the status of a job and sends back job state if job is incomplete; sends back html results if job is complete; 

### Usage

#### Making requests/creating new jobs on the queue

  * POSTMAN has a convenient request builder to hit the REST API endpoints, and it can also render HTML responses in their   "Preview" option.
   Specify a 'url' Params key and value, and a composite URL will built for you.

  * Using browser or curl

   ``` $ curl http://localhost:3000/api\?url\=http://www.google.com ```

#### Viewing job status 
  * To check job status in Kue's UI, go to http://localhost:3000/queue, or 
  * check job status/results by navigating to  http://localhost:3000/api/:id using your browser, POSTMAN, or curl.

### Run Tests

  Run 'npm test' in the project's root directory.
  
  ```$ npm test```
