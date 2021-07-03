import { getRepository } from "typeorm";
import { Chapter, Story, User } from "../../entity";
import { v4 as uuidv4 } from 'uuid';
import { Language, UserRole } from "../../types";
import { AuthenticationError, UserInputError } from "apollo-server";

export const Mutation = {
  createStory: async (parent: any, args: any, context: any): Promise<Story> => {

    if (!context.userId) {
      throw new AuthenticationError("Unauthorized");
    }

    const storyRepository = getRepository(Story);
    const chapterRepository = getRepository(Chapter);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(context.userId);

    if (!user || user.role !== UserRole.ADMIN) {
      throw new AuthenticationError("Unauthorized");
    }

    if (!args.language || !Object.values(Language).includes(args.language as Language)) {
      throw new UserInputError("Invalid Language");
    }

    const story = await storyRepository.find({ language: args.language });

    if (story && story[0]){
      throw new UserInputError("There is an story for this language already");
    }

    if (!args.text || args.text.trim() === "" || args.text.length > 1000) {
      throw new UserInputError("Invalid text");
    }

    const storyId = uuidv4();

    const chapter = await chapterRepository.save({
      id: uuidv4(),
      author: user,
      depth: 0,
      storyId: storyId,
      text: args.text,
    });

    return storyRepository.save({
      id: uuidv4(),
      language: args.language,
      firstChapterId: chapter.id,
    });
  },
};