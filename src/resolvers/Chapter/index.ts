import { author, children, parent, votes } from "./Fields";
import { Query } from "./Query";
import { Mutation } from "./Mutation";

export const chapterResolvers = {
  Query,
  Mutation,
  author,
  children,
  parent,
  votes,
};