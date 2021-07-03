import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Status } from "../types";
import { User } from "./User";
import { Vote } from "./Vote";

@Entity()
export class Chapter {

  @PrimaryColumn()
  id: string;

  @Column()
  text: string;

  @Column()
  depth: number;

  @ManyToOne(() => User, user => user.chapters)
  author: User;

  @OneToMany( type => Vote, vote => vote.chapter)
  votes: Vote[];

  @OneToMany( type => Chapter, child => child.parent)
  children: Chapter[];

  @ManyToOne(type => Chapter, parent => parent.children)
  parent: Chapter;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  storyId: string;

  @Column({
    type: "enum",
    enum: ["WAITING", "APPROVED", "REPROVED"],
    default: "WAITING"
  })
  status: Status
}