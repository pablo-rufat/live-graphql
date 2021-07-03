import { getRepository } from "typeorm";
import { Chapter, User } from "../../entity";
import { v4 as uuidv4 } from 'uuid';
import { Status, UserRole } from "../../types";
import { AuthenticationError, UserInputError } from "apollo-server";

export const Mutation = {
  createChapter: async (parent: any, args: any, context: any): Promise<Chapter> => {

    if (!context.userId) {
      throw new AuthenticationError("Unauthorized");
    }

    if (!args.parentId) {
      throw new UserInputError("Invalid Parent");
    }

    if (!args.text || args.text.trim() === "") {
      throw new UserInputError("Invalid text");
    }

    const chapterRepository = getRepository(Chapter);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(context.userId);
    const parentChapter = await chapterRepository.findOne(args.parentId, { relations: [ "children" ] });

    if (!parentChapter) {
      throw new UserInputError("Invalid Parent");
    }

    return chapterRepository.save({
      id: uuidv4(),
      author: user,
      children: [],
      depth: parentChapter.depth + 1,
      parent: parentChapter,
      storyId: parentChapter.storyId,
      votes: [],
      text: args.text,
    });
  },
  moderate: async (parent: any, args: any, context: any): Promise<Chapter> => {

    if (!context.userId) {
      throw new Error("Unauthorized");
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(context.userId);

    if (!user || user.role !== UserRole.MOD) {
      throw new Error("Unauthorized");
    }

    if (!args.status || !Object.values(Status).includes(args.status as Status)) {
      throw new Error("Invalid Status");
    }

    const chapterRepository = getRepository(Chapter);

    const chapter = await chapterRepository.findOne(args.chapterId);

    if (!chapter) {
      throw new Error("Chapter not found");
    }

    await chapterRepository.update(chapter.id, { status: args.status });

    return chapter;
  },
};