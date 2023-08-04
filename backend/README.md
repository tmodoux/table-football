# Table-football Backend

GraphQL backend to keep track of the score during table-football games

## How to run

**_Prerequisites: node.js (18.17.0)_**

Run the following commands from the current folder:

```bash
npm install
npm start
```

By default, it will run on port 4000, you can change this in the [.env file](./.env).

You can explore the API documentation as well as a sandbox environment by opening the following URL in your browser: http://localhost:4000

## Other commands

- Run tests: `npm test`

## Dependencies

- **apollo-server**: open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.
- **reflect-metadata**: allows to work with TypeScript decorators
- **sqlite3**: popular smallest implementation of SQL database engine
- **ts-node**: TypeScript execution environment for Node.js
- **type-graphql**: allows to create GraphQL schema and resolvers with TypeScript, using classes and decorators
- **typeorm**: data-mapper ORM for TypeScript which supports many databases
- **typescript**: typing language for application-scale JavaScript
- **jest**, **ts-jest**, **@types/jest**: testing library for Javascript
- **nodemon**: simple monitor script for Node.js
