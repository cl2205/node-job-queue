# Node Job Queue

A job queue for Node.js using Kue and persisted with Redis. Uses Express for routing.

## How It Works

The queue should be able to:

* create a new job on the queue when a user makes a request to the API, and return the job ID to the user
* store the results in the queue when a job has completed
* send the results to a user when a request is made to a specific job ID, and that job has completed
* send state information when a request is made for a specific job and the job has NOT completed
* delete jobs from the queue once completed results have been delivered to the user


### REST API Endpoints

* **GET /api/?url=http://www.site.com**  
  Adds a new job to the job queue and sends back the job ID to the user

* **GET /api/:id** <br>
   Checks the status of a job and sends back results if job is complete; job state if job is incomplete.


### How to Install

1. Install Node.js
2. Clone the node-job-queue repo link.

 ```$ git clone https://github.com/cl2205/node-job-queue.git```
 
 ```$ cd node-job-queue```

3. Run `npm install` to install dependencies.
4. Have a redis-server running on your system 

 ```$ src/redis-server```
 
5. Launch the app by running ```npm start``` in the project's root directory.

  ```$ npm start```

 The app will run on http://local host:3000.

### Test

#### Using POSTMAN
POSTMAN is recommended for its convenient request builder features, and it can also render HTML responses in their "Preview" option. 
Specify a 'url' parameter key and value, and a composite URL will built for you.


#### Using curl

You can also use curl  - just remember to escape the special characters.

``` $ curl http://localhost:3000/api\?url\=http://www.google.com ```


