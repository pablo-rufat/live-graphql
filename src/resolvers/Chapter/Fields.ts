import { getRepository } from "typeorm";
import { Chapter, User, Vote } from "../../entity";

export const children = async (parent: any, args: any, context: any): Promise<Chapter[]> => {
  const chapterRepository = getRepository(Chapter);
  const chapter = await chapterRepository.findOne(parent.id, { relations: ["children"] });
  return chapter.children;
};

export const parent = async (parent: any, args: any, context: any): Promise<Chapter> => {
  const chapterRepository = getRepository(Chapter);
  const chapter = await chapterRepository.findOne(parent.id, { relations: ["parent"] });
  return chapter.parent;
};

export const author = async (parent: any, args: any, context: any): Promise<User> => {
  const chapterRepository = getRepository(Chapter);
  const chapter = await chapterRepository.findOne(parent.id, { relations: ["author"] });
  return chapter.author;
};

export const votes = async (parent: any, args: any, context: any): Promise<Vote[]> => {
  const chapterRepository = getRepository(Chapter);
  const chapter = await chapterRepository.findOne(parent.id, { relations: ["votes"] });
  return chapter.votes;
};