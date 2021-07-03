import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Language } from "../types";
import { Chapter } from "./Chapter";

@Entity()
export class Story {

  @PrimaryColumn()
  id: string;

  @Column({
    type: "enum",
    enum: ["ES", "PT", "EN"],
    default: "PT",
    unique: true
  })
  language: Language;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  firstChapterId: string;
}