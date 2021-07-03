import { getRepository } from "typeorm";
import { Chapter, User, Vote } from "../../entity";

export const votes = async (parent: any, args: any, context: any): Promise<Vote[]> => {
  const userRepository = getRepository(User);
  const chapter = await userRepository.findOne(parent.id, { relations: ["votes"] });
  return chapter.votes;
};

export const chapters = async (parent: any, args: any, context: any): Promise<Chapter[]> => {
  const userRepository = getRepository(User);
  const chapter = await userRepository.findOne(parent.id, { relations: ["chapters"] });
  return chapter.chapters;
};