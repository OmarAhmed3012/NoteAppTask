// src/models/noteType.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Note } from './note';

@Entity()
export class NoteType {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  typeName !: string;

  @Column({ default: false })
  disabled !: boolean;

  // Add any other properties and relationships as needed

  @OneToMany(() => Note, (note) => note.noteType)
  notes !: Note[];
}
