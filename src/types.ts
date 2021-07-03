import { Chapter, Vote } from "./entity";

export type User = {
  id: string;
  name: string;
  email: string;
  chapters: Chapter[];
  votes: Vote[];
  role: UserRole;
};

export type AuthPayload = {
  token: string;
  user: User;
};

export enum Status {
  WAITING = "WAITING",
  APPROVED = "APPROVED",
  REPROVED = "REPROVED"
}

export enum Language {
  ES = "ES",
  PT = "PT",
  EN = "EN",
}

export enum UserRole {
  ADMIN = "ADMIN",
  MOD = "MOD",
  USER = "USER",
}