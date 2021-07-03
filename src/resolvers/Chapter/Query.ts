import { UserInputError } from "apollo-server";
import { getRepository } from "typeorm";
import { Chapter } from "../../entity";
import { Status } from "../../types";

export const Query = {

  chapter: async (parent: any, args: any, context: any): Promise<Chapter> => {

    if (!args.id) {
      throw new UserInputError("Invalid chapter ID");
    }

    const chapterRepository = getRepository(Chapter);
    const chapter = await chapterRepository.findOne(args.id);

    if (!chapter) {
      return;
    }

    return chapter;
  },
  chapters: async (parent: any, args: any, context: any): Promise<Chapter[]> => {

    const chapterRepository = getRepository(Chapter);
    return chapterRepository.find();

  },
  chaptersByStatus: async (parent: any, args: any, context: any): Promise<Chapter[]> => {

    if (!args.status || !Object.values(Status).includes(args.status as Status)) {
      throw new UserInputError("Invalid status");
    }

    const chapterRepository = getRepository(Chapter);
    return chapterRepository.find({ where: { status: args.status } });
  },
};