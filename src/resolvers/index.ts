import { storyResolvers } from "./Story";
import { chapterResolvers } from "./Chapter";
import { voteResolvers } from "./Vote";
import { userResolvers } from "./User";

export const resolvers = {
  Query: {
    chapter: chapterResolvers.Query.chapter,
    story: storyResolvers.Query.story,
    stories: storyResolvers.Query.stories,
    chapters: chapterResolvers.Query.chapters,
    chaptersByStatus: chapterResolvers.Query.chaptersByStatus,
    user: userResolvers.Query.user,
    users: userResolvers.Query.users,
  },
  Mutation: {
    createChapter: chapterResolvers.Mutation.createChapter,
    moderate: chapterResolvers.Mutation.moderate,
    createStory: storyResolvers.Mutation.createStory,
    vote: voteResolvers.Mutation.vote,
    signUp: userResolvers.Mutation.signUp,
    signIn: userResolvers.Mutation.signIn,
    setUserLanguage: userResolvers.Mutation.setUserLanguage,
    setUserBookmark: userResolvers.Mutation.setUserBookmark,
  },
  User: {
    chapters: userResolvers.chapters,
    votes: userResolvers.votes,
  },
  Vote: {
    user: voteResolvers.user,
    chapter: voteResolvers.chapter,
  },
  Chapter: {
    children: chapterResolvers.children,
    parent: chapterResolvers.parent,
    author: chapterResolvers.author,
    votes: chapterResolvers.votes,
  }
}