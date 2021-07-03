import { UserInputError } from "apollo-server";
import { getRepository } from "typeorm";
import { Story } from "../../entity";
import { Language } from "../../types";

export const Query = {
  story: async (parent: any, args: any, context: any): Promise<Story> => {

    if (!args.language || !Object.values(Language).includes(args.language as Language)) {
      throw new UserInputError("Invalid Language");
    }

    const storyRepository = getRepository(Story);
    const stories = await storyRepository.find({ where: { language: args.language } });

    if (!stories || stories.length === 0) {
      return;
    }

    return stories[0];

  },
  stories: async (parent: any, args: any, context: any): Promise<Story[]> => {

    const storyRepository = getRepository(Story);
    return storyRepository.find();

  },
};