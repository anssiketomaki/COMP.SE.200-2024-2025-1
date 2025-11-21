# Student template

## Purpose of this repository

This is a project template for students participating in Software Testing course
at Tampere University.

The repository only contains the source code that is under testing, `package.json` skeleton
and LICENSE file.

Source code folder contains a separate license file that must **NOT** be removed under any circumstances!
Removing this license file directly violates terms and conditions of the software under testing.
Individuals who remove or modify the license file will also carry the consequences.

***
## Running tests on command line / terminal
The tests can be run in the command line at '/backend' and after having ran the command:
```
npm install
```
"npm install" downloads the project dependencies including the utility library that the tests are written for. After that you can run the tests with the command: 
```
npm test
```
If you wish to create also a v8 test coverage report while running the tests, use command:
```
npm test -- --coverage
```
---

## Docker
There is a Dockerfile present at the /backend of the project, that runs the tests that are present. Using this can be useful for some testing tools as well as in GitHub Actions CI/CD -pipeline that is impelemented.

Here is how to run the backend tests locally in docker:
### step 1
Open terminal in the backend-directory with its Dockerfile and run:
```
docker build -t myapp .
```
This is a container image creation command, where:
* docker build – builds a new Docker image
* -t myapp – assigns a tag (name) to the image (e.g., frontend, backend, tests)
* . – the build context (current directory)

### step 2
Then you can proceed to creating an instance of desired docker build. There can be multiple simultaneous instances running of same build, that have their own names.
```
docker run --name mycontainer myapp
```

Command parts:
* --name mycontainer
Assigns a human-readable name. If omitted, Docker generates a random one.
* (optional) -d : Not recommended if you want to see test output, but it runs the container in detached mode.
* myapp refers to the image you built earlier.

### step 3
In this project there can easily pile up many old containers. Existing container(s) can be cleaned up /removed with this command:
```
docker system prune
```
* By adding handle "-a" docker will delete also unused images.

### (extra 1)
Docker images can be removed separately with command:
```
docker rmi myapp
```

### (extra 2)
Running docker container can be stopped with command:
```
docker stop mycontainer
```

### (extra 3)
Excisting container can be re-started with command:
```
docker start mycontainer
```
* Note that this is not useful command in this project as the container has to be re-built from the ground up after every change in code or configuration.
