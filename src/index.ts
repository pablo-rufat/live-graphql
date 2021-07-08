import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { resolvers } from "./resolvers";
import { getUserId, typeormOptions } from "./utils";

console.log(process.env.DATABASE_URL);

createConnection(typeormOptions).then( async connection => {

  const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
    context: ({ req }) => {
      return {
        ...req,
        userId:
          req && req.headers.authorization
            ? getUserId(req)
            : null
      }
    },
    introspection: process.env.NODE_ENV === "development",
    playground: process.env.NODE_ENV === "development",
  });

  server
    .listen()
    .then(
      ({ url }) => console.log(`Server rodando em ${url}`)
    );

}).catch(
  error => console.error(error)
);