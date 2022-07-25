# node-api-nestjs

An example API written using [NestJS](https://nestjs.com/) with:

- Dev container
- SQL database using [Prisma](https://www.prisma.io/)
- Docker
- Swagger
- [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807)-compliant errors

## Dev Container

This repo includes a [dev container](https://containers.dev/) which provides a fully-featured development environment including:

- Node.js
- SQL server
- Docker
- VS Code extensions: SQL Server, Prisma, ES Lint

## Getting started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [VS Code](https://code.visualstudio.com/)
- [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Open the code in the dev container:

1. Ensure Docker is running
2. Clone the repo and open it in VS Code
3. Use the Remote Containers "Reopen in Container" command

Install dependencies:

```
npm install
```

Run the tests:

```
npm test
```

Run the application:

```
docker-compose build
docker-compose up
```

Navigate to [localhost:3000/swagger]() to view the swagger

## Database

The dev container includes a SQL Server container and the SQL Server VS Code extension. Select the SQL Server option in the left-hand bar in VS Code and use it to connect to the database using these options:

- Server name: db
- Database name: {leave blank}
- Authentication type: SQL Login
- User name: sa
- Password: P@ssword