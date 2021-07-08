import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    story(language: Languages!): Story
    chapter(id: ID!): Chapter

    stories: [Story]!
    chapters: [Chapter]!
    chaptersByStatus(status: Status!): [Chapter]!

    user(id: ID!): User
    users: [User]!
    userFromToken: User
  }

  type Mutation {
    signUp(email: String!, password: String!, name: String!, role: Roles, language: Languages!): AuthPayload
    signIn(email: String!, password: String!): AuthPayload
    createStory(language: Languages!, text: String!): Story! # Need auth ADMIN
    createChapter(parentId: ID!, text: String!): Chapter! # Need Auth USER
    vote(chapterId: ID!): Vote! # Need Auth USER
    moderate(chapterId: ID!, status: Status!): Chapter! # Need Auth MOD
    setUserLanguage(language: Languages!): User! # Need Auth USER
    setUserBookmark(chapterId: String!): User! # Need Auth USER
  }

  type Story {
    id: ID!
    language: Languages!
    createdAt: String!
    updatedAt: String!
    firstChapterId: String!
  }

  type Chapter {
    id: ID!
    text: String!
    depth: Int!
    children: [Chapter]!
    parent: Chapter
    author: User!
    createdAt: String!
    votes: [Vote]!
    storyId: String!
    status: Status
  }

  type Vote {
    id: ID!
    user: User!
    chapter: Chapter!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    chapters: [Chapter]!
    votes: [Vote]!
    role: Roles!
    language: Languages!
    bookmark: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  enum Roles {
    USER
    MOD
    ADMIN
  }

  enum Status {
    WAITING
    APPROVED
    REPROVED
  }

  enum Languages {
    ES
    PT
    EN
  }
`;