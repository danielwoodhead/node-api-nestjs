# node-api-nestjs

An example API written using [NestJS](https://nestjs.com/) with:

- docker
- swagger
- [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807)-compliant errors

## Installation

```bash
npm install
```

## Running the app

```bash
docker-compose build
docker-compose up
```

Or

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test


# test coverage
npm run test:cov
```
