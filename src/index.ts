import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { resolvers } from "./resolvers";
import { getUserId } from "./utils";
import * as dotenv from "dotenv";
import { typeDefs } from "./typeDefs";

dotenv.config();

createConnection().then( async connection => {

  const server = new ApolloServer({
    typeDefs,
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