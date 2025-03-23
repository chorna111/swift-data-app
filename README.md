# Swift codes API app
## Instructions for setting up and running
- install Docker on your machine and ensure it's running
- navigate to the server directory and run the following command to build the application:
```sh
docker compose build
```
### Running tests
- to run tests use the following command:
```sh
docker compose run --rm app npx jest --watchAll
```
- wait for tests to complete
### Running the API in normaal mode
- if you want to start API in normal mode, run the following command:
```sh
docker compose up
```
- after this you can send requests using Postman, for example
