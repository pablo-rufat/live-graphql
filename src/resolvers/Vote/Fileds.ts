import { getRepository } from "typeorm";
import { Chapter, User, Vote } from "../../entity";

export const user = async (parent: any, args: any, context: any): Promise<User> => {
  const voteRepository = getRepository(Vote);
  const vote = await voteRepository.findOne(parent.id);
  return vote.user;
};

export const chapter = async (parent: any, args: any, context: any): Promise<Chapter> => {
  const voteRepository = getRepository(Vote);
  const vote = await voteRepository.findOne(parent.id);
  return vote.chapter;
};