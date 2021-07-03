import { getRepository } from "typeorm";
import { Chapter, User, Vote } from "../../entity";
import { v4 as uuidv4 } from 'uuid';

export const Mutation = {
  vote: async (parent: any, args: any, context: any): Promise<Vote> => {

    if (!context.userId) {
      throw new Error("Unauthorized");
    }

    if (!args.chapterId) {
      throw new Error("Invalid chapter");
    }

    const voteRepository = getRepository(Vote);
    const chapterRepository = getRepository(Chapter);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(context.userId);

    if (!user) {
      throw new Error("Invalid user");
    }

    const chapter = await chapterRepository.findOne(args.chapterId);

    if (!chapter) {
      throw new Error("Invalid chapter");
    }

    const votes = await voteRepository.find({ where: { chapter: { id: args.chapterId }, user: { id: context.userId } } });

    if (votes && votes[0] ) {
      return votes[0];
    }

    return voteRepository.save({
      id: uuidv4(),
      user,
      chapter
    });
  },
};