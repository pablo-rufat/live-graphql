import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Language, UserRole } from "../types";
import { Chapter } from "./Chapter";
import { Vote } from "./Vote";

@Entity()
export class User {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Chapter, chapter => chapter.author)
  chapters: Chapter[];

  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[];

  @Column({
    type: "enum",
    enum: ["ADMIN", "MOD", "USER"],
    default: "USER"
  })
  role: UserRole;

  @Column({
    type: "enum",
    enum: ["EN", "ES", "PT"],
    default: "EN"
  })
  language: Language;

  @Column({ nullable: true, default: null })
  bookmark: string;
}