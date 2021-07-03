import { Mutation } from "./Mutation";
import { Query } from "./Query";
import { chapters, votes } from "./Fields";

export const userResolvers = {
  Query,
  Mutation,
  chapters,
  votes,
};