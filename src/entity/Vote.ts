import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Chapter } from "./Chapter";
import { User } from "./User";

@Entity()
export class Vote {

  @PrimaryColumn()
  id: string;

  @ManyToOne(type => User, user => user.votes)
  user: User;

  @ManyToOne(type => Chapter, chapter => chapter.votes)
  chapter: Chapter;
}