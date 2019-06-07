# Zombie

Repository for zombies and equipment.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
Serverless framework
```

### Installing 

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
npm install
```

to invoke localy

```
sls invoke localy -s stageName -f functionName
```


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

TODO


## Documentation

To generate Swagger OpenApi file run

```
npm run docs
```


## Deployment

To deploy on stage use commend

```
sls deploy -s STAGENAME
```

after that to bind events to S3 buckets it's necessary to run command

```
sls s3deploy -s STAGENAME
```


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## Authors

* **Piotr Kalinski** - developer
