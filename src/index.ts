import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { checkAPIKey, getUserId } from "./utils";
import * as dotenv from "dotenv";
import { typeDefs } from "./typeDefs";
import './dbConfig';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    checkAPIKey(req);
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
  .listen({
    port: process.env.PORT || 4000,
  })
  .then(
    ({ url }) => console.log(`Server rodando em ${url}`)
  );
