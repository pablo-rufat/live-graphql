import { getRepository } from "typeorm";
import { User } from "../../entity";

export const Query = {
  user: async (parent: any, args: any, context: any): Promise<User> => {

    const userRepository = getRepository(User);
    return userRepository.findOne(args.id);

  },
  users: async (parent: any, args: any, context: any): Promise<User[]> => {

    const userRepository = getRepository(User);
    return userRepository.find();

  },
};