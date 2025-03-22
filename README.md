# Swift codes API app
## Instructions for setting up and running
- install Docker on your machine and run it
- run the following command to build the application:
```sh
docker compose build
```
### Running tests
- to run tests run the following command:
```sh
docker compose run --rm app npx jest --watchAll
```
- wait for tests to run
### Running the PAPI in normaal mode
- if you want to start API in normal mode, run the following command:
```sh
docker compose up
```
- after this you can send requests using Postman, for example
