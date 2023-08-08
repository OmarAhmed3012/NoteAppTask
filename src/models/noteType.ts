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


  @OneToMany(() => Note, (note) => note.noteType)
  notes !: Note[];
}
