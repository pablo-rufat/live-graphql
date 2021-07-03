import { getRepository } from "typeorm";
import { Chapter, User } from "../../entity";
import { v4 as uuidv4 } from 'uuid';
import { compare, hash } from "bcryptjs";
import { AuthPayload, Language, UserRole } from "../../types";
import { sign } from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";

export const Mutation = {
  setUserLanguage: async (parent: any, args: any, context: any): Promise<User> => {

    if (!context.userId) {
      throw new AuthenticationError("Unauthorized");
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(context.userId);

    if (!user) {
      throw new UserInputError("User not found");
    }

    if (!args.language || !Object.values(Language).includes(args.language as Language)) {
      throw new UserInputError("Invalid language");
    }

    user.language = args.language;

    userRepository.save(user);

    return user;
  },
  setUserBookmark: async (parent: any, args: any, context: any): Promise<User> => {

    if (!context.userId) {
      throw new AuthenticationError("Unauthorized");
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(context.userId);

    if (!user) {
      throw new UserInputError("User not found");
    }

    if (!args.chapterId) {
      throw new UserInputError("Invalid chapter id");
    }

    const chapterRepository = getRepository(Chapter);
    const chapter = await chapterRepository.findOne(args.chapterId);

    if (!chapter) {
      throw new UserInputError("Invalid chapter id");
    }

    user.bookmark = args.chapterId;

    userRepository.save(user);

    return user;
  },
  signUp: async (parent: any, args: any, context: any): Promise<AuthPayload> => {

    if (!args.email) {
      throw new UserInputError("Invalid e-mail");
    }

    if (!args.password || args.password.length < 8) {
      throw new UserInputError("Invalid password");
    }

    if (!args.name || args.name.trim() === "") {
      throw new UserInputError("Invalid name");
    }

    const userRepository = getRepository(User);
    const password = await hash(args.password, 10);

    const user = await userRepository.save({
      id: uuidv4(),
      name: args.name,
      email: args.email,
      password,
      role: args.role || UserRole.USER,
      language: args.language,
    });

    const token = sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      token,
      user
    };
  },
  signIn: async (parent: any, args: any, context: any): Promise<AuthPayload> => {

    if (!args.email) {
      throw new UserInputError("Invalid e-mail");
    }

    if (!args.password || args.password.length < 8) {
      throw new UserInputError("Invalid password");
    }

    const userRepository = getRepository(User);

    const users = await userRepository.find({ where: { email: args.email } });

    if (!users || !users[0]) {
      throw new UserInputError("User not found");
    }

    const user = users[0];

    const valid = await compare(args.password, user.password);

    if (!valid) {
      throw new UserInputError("Invalid password");
    }

    const token = sign({ userId: user.id }, process.env.APP_SECRET);

    return {
      token,
      user
    };
  },
};