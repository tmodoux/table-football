# Table-football

Simple service to keep track of the score during table-football games

The stack consists of:

- a React/Typescript frontend
- a GraphQL API written in Node.js/Typescript
- a SQLite database

## How to run with Docker

**_Prerequisites: docker (24.0.5), docker-compose (2.20.2)_**

Run the following command from the root of this project:

```bash
docker-compose up
```

It will run two Docker images, the [frontend service](./frontend/Dockerfile) on port 3000 and the [backend service](./backend/Dockerfile) on port 4000 (ports mapping can be changed in [docker-compose.yml](./docker-compose.yml)).

Then open the following URL in your browser: http://localhost:3000

## Learn more

To know more about each service or to run them separately and locally, please see the respective README's:

- [backend](./backend/README.md)
- [frontend](./frontend/README.md)
