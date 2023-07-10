# Task Manager REST API

## Description

A simple project for managing tasks using Nest as a web framework.

## Installation

Add the environments below to `.env` or export in your favorite bash file.

| Name              | Value               |
|-------------------|---------------------|
| PG_CONTAINER_NAME | postgres_task       |
| POSTGRES_USER     | tasks_admin         |
| POSTGRES_PASSWORD | admingres           |
| POSTGRES_DB       | taskmanagement      |
| PGDATA            | /data/postgres-task |
| PG_HOST           | db                  |
| PG_PORT           | 5432                |
| APP_PORT          | 3000                |


```bash
$ npm install
```

## Running the app

```bash
$ docker-compose up -d
```

## Endpoints

Add the API documentation here

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TO-DO

- [ ] Add more unit tests
- [ ] Add integration tests
- [ ] Add more logs
- [ ] Add Redis
- [ ] Add Swagger documentation

## License

Nest is [MIT licensed](LICENSE).
