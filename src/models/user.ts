import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Note } from './note';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  name !: string;

  @Column()
  profilePicture !: string;

  // Add any other properties and relationships as needed

  @OneToMany(() => Note, (note) => note.user)
  notes !: Note[];
}
